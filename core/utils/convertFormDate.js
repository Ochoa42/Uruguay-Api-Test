export const convertToFormData = (body) => {
    const formData = new FormData();
    
    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });

    return formData;
};


export const getElementsAtCustomIndices=(arr)=>{
    return arr.filter((_, index) => (index - 2) % 3 === 0 && index >= 2);
}