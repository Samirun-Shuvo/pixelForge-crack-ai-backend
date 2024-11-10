const getImageUrl = async (buffer, prompt) => {
  const imageFormData = new FormData();
  imageFormData.append(
    "image",
    new Blob([buffer], { type: "image/jpeg" }),
    `${prompt}.jpg`
  );
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMAGEBB_API_KEY}`,
    {
      method: "POST",
      body: imageFormData,
    }
  );
  const imgData = await response.json();
  return imgData;
};
module.exports = getImageUrl;
