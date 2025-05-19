import Swal from "sweetalert2";

const successAlert = (title) => {
  const alert = Swal.fire({
    title: title,
    // text: "You clicked the button!",
    icon: "success",
    confirmButtonColor:"#00b050"
  });
  return alert;
};

export default successAlert;
