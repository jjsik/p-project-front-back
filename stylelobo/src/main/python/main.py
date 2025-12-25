import os
import torch
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
import facer
import base64

# 모델 로드
model_path = os.path.join(os.path.dirname(__file__), "personal_color_classifier.keras")
model = load_model(model_path)

# MinMaxScaler 정의 (RGB 범위를 0~1로 정규화)
scaler = MinMaxScaler(feature_range=(0, 1))
scaler.fit([[0, 0, 0], [255, 255, 255]])

# 라벨 인코딩 설정
label_classes = ['봄 웜톤', '여름 쿨톤', '가을 웜톤', '겨울 쿨톤']
label_encoder = LabelEncoder()
label_encoder.fit(label_classes)

label_to_english = {
    '봄 웜톤': 'spring',
    '여름 쿨톤': 'summer',
    '가을 웜톤': 'fall',
    '겨울 쿨톤': 'winter'
}

# Base64 이미지를 저장하는 함수
def save_base64_image(base64_string, output_path="temp_image.jpg"):
    try:
        image_data = base64.b64decode(base64_string)
        with open(output_path, "wb") as f:
            f.write(image_data)
        return output_path
    except Exception as e:
        print(f"Error saving Base64 image: {e}")
        return None

# 얼굴 평균 색상 추출 함수
def get_average_skin_color(img_path, face_detector, face_parser, device='cuda'):
    try:
        # 이미지 로드 및 전처리
        image = facer.hwc2bchw(facer.read_hwc(img_path)).to(device=device)

        with torch.inference_mode():
            # 얼굴 탐지 및 세그멘테이션
            faces = face_detector(image)
            faces = face_parser(image, faces)

        # 마스크 생성
        seg_logits = faces['seg']['logits']
        seg_probs = seg_logits.softmax(dim=1).cpu().numpy()

        # 얼굴 및 코 마스크 추출
        face_mask = seg_probs[0, :, :, 1]  # 얼굴 마스크
        nose_mask = seg_probs[0, :, :, 6]  # 코 마스크
        face_nose_mask = cv2.add(face_mask, nose_mask)

        # 이진화
        binary_mask = (face_nose_mask >= 0.5).astype(int)

        # 원본 이미지 로드
        img = cv2.imread(img_path)
        if img is None:
            raise ValueError("이미지 로드 실패")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # 마스크와 이미지 크기 맞추기
        if binary_mask.shape[:2] != img.shape[:2]:
            binary_mask = cv2.resize(binary_mask, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)

        # 마스크가 적용된 영역에서 RGB 값 추출
        indices = np.argwhere(binary_mask)
        if indices.size == 0:
            raise ValueError("마스크에 유효한 영역이 없습니다.")
        rgb_values = img[indices[:, 0], indices[:, 1], :]
        return rgb_values
    except Exception as e:
        print(f"Error extracting skin color: {e}")
        return None

# 최종 평균 색상 계산
def calculate_final_color_from_top_colors(rgb_codes):
    try:
        rgb_codes = np.array(rgb_codes)
        percent = 70

        top_rgb = []
        for i in range(3):  # R, G, B 각각 계산
            sorted_indices = np.argsort(rgb_codes[:, i])[::-1]
            top_values = rgb_codes[sorted_indices][: int(len(rgb_codes) * percent / 100)]
            top_rgb.append(np.mean(top_values, axis=0))

        final_rgb = np.mean(top_rgb, axis=0).astype(int)
        return final_rgb
    except Exception as e:
        print(f"색상 계산 오류: {e}")
        return [0, 0, 0]

# 퍼스널 컬러 예측 함수
def predict_personal_color_from_base64(base64_image, face_detector, face_parser, device='cuda'):
    try:
        # Base64 이미지를 임시 파일로 저장
        temp_image_path = save_base64_image(base64_image, "temp_image.jpg")
        if not temp_image_path:
            raise ValueError("이미지 저장 실패")

        # 얼굴 평균 색상 추출
        rgb_values = get_average_skin_color(temp_image_path, face_detector, face_parser, device)
        if rgb_values is None:
            raise ValueError("RGB 값 추출 실패")

        # 상위 70% 색상 기반 최종 색상 계산
        final_color = calculate_final_color_from_top_colors(rgb_values)

        # 정규화 및 모델 예측
        normalized_color = scaler.transform([final_color])
        predictions = model.predict(normalized_color)
        predicted_class = np.argmax(predictions, axis=1)
        predicted_label = label_encoder.inverse_transform(predicted_class)[0]
        english_label = label_to_english[predicted_label]

        # 임시 파일 삭제
        os.remove(temp_image_path)

        return english_label
    except Exception as e:
        print(f"Prediction Error: {e}")
        return "Error"

# 메인 실행
if __name__ == "__main__":
    try:
        # Base64 이미지 데이터는 Java에서 전달
        import sys
        if len(sys.argv) < 2:
            print("Error: Base64 이미지 데이터가 필요합니다.")
            exit(1)

        base64_image_data = sys.argv[1]

        # GPU 최적화
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        if device == 'cuda':
            torch.backends.cudnn.benchmark = True
            torch.cuda.empty_cache()

        # Facer 초기화
        face_detector = facer.face_detector('retinaface/mobilenet', device=device)
        face_parser = facer.face_parser('farl/lapa/448', device=device)

        # 퍼스널 컬러 예측
        personal_color = predict_personal_color_from_base64(base64_image_data, face_detector, face_parser, device)
        print(personal_color)
    except Exception as e:
        print(f"Error: {e}")
