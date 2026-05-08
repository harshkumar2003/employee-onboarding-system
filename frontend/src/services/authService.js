export const mockLoginAPI = (
  email,
  password
) => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (
        email === "admin@gmail.com" &&
        password === "123456"
      ) {

        resolve({
          success: true,
          token: "fake-token"
        });

      } else {

        reject(
          new Error("Invalid credentials")
        );

      }

    }, 2000);

  });

};