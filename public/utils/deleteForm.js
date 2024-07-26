document.addEventListener("DOMContentLoaded", function () {
  const deleteForms = document.querySelectorAll(".delete-form");

  deleteForms.forEach(form => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const confirmed = window.confirm("Are you sure you want to delete?");

      if (confirmed) {
        form.submit();
      }
    });
  });
});
