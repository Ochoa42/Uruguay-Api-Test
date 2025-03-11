export const convertToFormData = (body) => {
    const formData = new FormData();
    
    Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
    });

    return formData;
};
