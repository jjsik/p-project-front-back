// Helper function to generate image paths dynamically
const generateImagePaths = (folder, count) => {
    return Array.from({ length: count }, (_, index) =>
        require(`./${folder}/${index + 1}.jpg`)
    );
};

// Generate image arrays for each folder
const springManImages = generateImagePaths("springMan", 23);
const springWomanImages = generateImagePaths("springWoman", 25);
const summerManImages = generateImagePaths("summerMan", 20);
const summerWomanImages = generateImagePaths("summerWoman", 49);
const fallManImages = generateImagePaths("fallMan", 23);
const fallWomanImages = generateImagePaths("fallWoman", 42);
const winterManImages = generateImagePaths("winterMan", 30);
const winterWomanImages = generateImagePaths("winterWoman", 44);

export const imageSets = {
    spring: { male: springManImages, female: springWomanImages },
    summer: { male: summerManImages, female: summerWomanImages },
    fall: { male: fallManImages, female: fallWomanImages },
    winter: { male: winterManImages, female: winterWomanImages },
};
