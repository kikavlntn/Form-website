export {};
import axios from "axios";
import { InferCustomEventPayload } from "vite/types/customEvent";

const passwordWeak = document.querySelectorAll(
  ".p-weak"
) as NodeListOf<HTMLElement>;

const passwordMedium = document.querySelectorAll(
  ".p-medium"
) as NodeListOf<HTMLElement>;

const passwordStrong = document.querySelectorAll(
  ".p-strong"
) as NodeListOf<HTMLElement>;

const password = document.querySelectorAll(
  ".password"
) as NodeListOf<HTMLInputElement>;

const form = document.getElementById("wrapper") as HTMLFormElement;

for (let i = 0; i < password.length; i++) {
  password[i].addEventListener("keydown", () => {
    switch (true) {
      case password[i].value.length > 20:
        passwordStrong[i].style.backgroundColor = "green";
      case password[i].value.length > 12:
        passwordMedium[i].style.backgroundColor = "orange";
      case password[i].value.length > 3:
        passwordWeak[i].style.backgroundColor = "red";
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());
  try {
    await axios
      .get(`http://0.0.0.0:3000/users?email=${info.email}`)
      .then(async (response) => {
        let data = response.data[0];
        if (!data) {
          alert("This user doesnt exist");
        } else if (info.password !== info.password2) {
          alert("Passwords do not match");
        } else {
          const Object = {
            email: data.email,
            password: info.password,
            DOB: data.DOB,
          };
          await axios.post("http://0.0.0.0:3000/users", Object);
        }
      });
  } catch {}
});
