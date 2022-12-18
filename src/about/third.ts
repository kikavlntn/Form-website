export {};

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
