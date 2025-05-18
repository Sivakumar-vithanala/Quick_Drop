const successAlert = (title) => {
    const alert =  Swal.fire({
    title: title,
    // text: "You clicked the button!",
    icon: "success",
  });
  return alert
};

export default successAlert