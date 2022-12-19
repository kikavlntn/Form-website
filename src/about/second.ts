import axios from "axios";

export {};
const form = document.getElementById("wrapper") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());
  try {
    await axios
      .get(`http://0.0.0.0:3000/users?email=${info.email}`)
      .then(async (response) => {
        const data = response.data;

        const contrasenyas: string[] = [];
        for (let i = 0; i < data.length; i++) {
          contrasenyas.push(data[i].password);
        }

        if (!data) {
          window.location.replace("http://localhost:5173/");
        } else if (!contrasenyas.includes(info.password as string)) {
          alert("Details not correct, please try again or reset password");
        } else {
          alert("Logged in");
        }
      });
  } catch {
    console.log("Catch Statment");
  }
});
