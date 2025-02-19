import axios from "axios";

// hCaptcha testing secret key
const HCAPTCHA_VERIFY_URL = "https://hcaptcha.com/siteverify";

export const isCaptchaResponseValid = async (
  captchaResponse: string
): Promise<boolean> => {
  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.HCAPTCHA_SECRET_KEY!);
    params.append("response", captchaResponse);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(HCAPTCHA_VERIFY_URL, params, config);

    if (response.data.success === true) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};
