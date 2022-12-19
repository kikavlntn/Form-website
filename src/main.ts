import "./style.css";
import axios from "axios";

const password = document.getElementById("password") as HTMLInputElement;

const passwordWeak = document.getElementById("p-weak") as HTMLElement;

const passwordMedium = document.getElementById("p-medium") as HTMLElement;

const passwordStrong = document.getElementById("p-strong") as HTMLElement;

const form = document.getElementById("wrapper") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());
  try {
    await axios
      .get(`http://0.0.0.0:3000/users?email=${info.email}`)
      .then(async (response) => {
        let data = response.data;
        if (data.length > 0) {
          alert("User already created");
        } else {
          await axios.post("http://0.0.0.0:3000/users", info);
        }
      });
  } catch {
    async () => {
      console.log("Crear nuevo");
    };
  }
});

password.addEventListener("keydown", () => {
  switch (true) {
    case password.value.length > 20:
      passwordStrong.style.backgroundColor = "green";
    case password.value.length > 12:
      passwordMedium.style.backgroundColor = "orange";
    case password.value.length > 3:
      passwordWeak.style.backgroundColor = "red";
  }
});
