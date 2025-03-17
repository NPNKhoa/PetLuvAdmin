import Swal from 'sweetalert2';

class MyAlrt {
  constructor() {
    this.deleteColor = '#d33';
    this.cancelColor = '#aeaeae';
    this.errorImage = '/crying-cat.gif';
    this.successImage = '/happy-cat.gif';
    this.warningImage = '/warning-cat.gif';
    this.infoImage = '/infoImage-cat.gif';
    this.questionImage = '/questionImage-cat.gif';
    this.showClass = {
      popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
    };
    this.hideClass = {
      popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
    };

    this.customClass = {
      title: 'my-swal-title',
    };
  }

  Error(
    title,
    text,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
    confirmResult
  ) {
    Swal.fire({
      title,
      text,
      showCancelButton,
      confirmButtonColor: this.deleteColor,
      cancelButtonColor: this.cancelColor,
      cancelButtonText,
      confirmButtonText,
      imageUrl: this.errorImage,
      imageWidth: 200,
      imageAlt: 'Alert Image',
      showClass: this.showClass,
      hideClass: this.hideClass,
      customClass: this.customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmResult();
      }
    });
  }

  Info(title, text, confirmButtonText, showCancelButton, confirmResult) {
    Swal.fire({
      title,
      text,
      showCancelButton,
      confirmButtonColor: this.deleteColor,
      cancelButtonColor: this.cancelColor,
      confirmButtonText,
      imageUrl: this.infoImage,
      imageWidth: 200,
      imageAlt: 'Alert Image',
      showClass: this.showClass,
      hideClass: this.hideClass,
      customClass: this.customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmResult();
      }
    });
  }

  Success(title, text, confirmButtonText, showCancelButton, confirmResult) {
    Swal.fire({
      title,
      text,
      showCancelButton,
      confirmButtonColor: this.deleteColor,
      cancelButtonColor: this.cancelColor,
      confirmButtonText,
      imageUrl: this.successImage,
      imageWidth: 200,
      imageAlt: 'Alert Image',
      showClass: this.showClass,
      hideClass: this.hideClass,
      customClass: this.customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmResult();
      }
    });
  }

  Warning(title, text, confirmButtonText, showCancelButton, confirmResult) {
    Swal.fire({
      title,
      text,
      showCancelButton,
      confirmButtonColor: this.deleteColor,
      cancelButtonColor: this.cancelColor,
      confirmButtonText,
      imageUrl: this.warningImage,
      imageWidth: 200,
      imageAlt: 'Alert Image',
      showClass: this.showClass,
      hideClass: this.hideClass,
      customClass: this.customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmResult();
      }
    });
  }

  Question(title, text, confirmButtonText, showCancelButton, confirmResult) {
    Swal.fire({
      title,
      text,
      showCancelButton,
      confirmButtonColor: this.deleteColor,
      cancelButtonColor: this.cancelColor,
      confirmButtonText,
      imageUrl: this.questionImage,
      imageWidth: 200,
      imageAlt: 'Alert Image',
      showClass: this.showClass,
      hideClass: this.hideClass,
      customClass: this.customClass,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmResult();
      }
    });
  }
}

export default new MyAlrt();
