import Register from "../pages/register";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/globalStyle";

describe("Register", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Register />
      </ThemeProvider>
    );
  });

  it("renders page", () => {
    const heading = screen.getByText("LANG");
    expect(heading).toBeInTheDocument();
  });

  it("fails on submit without data", async () => {
    const button = screen.getByText(/Zarejestruj/i);
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "Nazwa jest wymagana!"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  // MOCKING FU***** FETCH IS AMAZING

  // it("passes on correct submit", async () => {
  //   const randomName = Math.floor(Math.random() * 12345697312);

  //   const name = screen.getByPlaceholderText("Nazwa użytkownika");
  //   fireEvent.change(name, { target: { value: randomName } });

  //   const email = screen.getByPlaceholderText("Mail");
  //   fireEvent.change(email, {
  //     target: { value: `${randomName}@langbara.com` },
  //   });

  //   const password = screen.getByPlaceholderText("Hasło");
  //   fireEvent.change(password, { target: { value: randomName } });

  //   const cpassword = screen.getByPlaceholderText("Powtórz hasło");
  //   fireEvent.change(cpassword, { target: { value: randomName } });

  //   await waitFor(() => {
  //     const button = screen.getByText(/Zarejestruj/i);
  //     fireEvent.click(button);
  //   });

  //   await waitFor(() => {
  //     const h = screen.getByText("Zalogowano");
  //     expect(h).toBeInTheDocument();
  //   });
  // });
});
