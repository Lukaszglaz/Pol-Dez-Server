import { createTransport } from "nodemailer";
import { MailKey } from "../types";
import {
  NODEMAILER_HOST,
  NODEMAILER_PASS,
  NODEMAILER_PORT,
  NODEMAILER_SECURE,
  NODEMAILER_USER,
} from "../config/config";

const transport = createTransport({
  host: NODEMAILER_HOST,
  port: Number(NODEMAILER_PORT),
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

function getContent(
  key: MailKey,
  variables: { [key: string]: string } | undefined
) {
  switch (key) {
    case MailKey.signup:
      return `
      <!DOCTYPE html>
      <html lang="pl">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Polska Dezerter - Clash of Clans</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
            }
      
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
      
            h1 {
              color: rgba(104, 85, 224, 1);
              font-size: 28px;
              text-align: center;
            }
      
            h3 {
              font-size: 18px;
              margin-top: 15px;
              color: #333;
            }
      
            h2,
            h3 {
              color: #000000;
            }
      
            h4,
            h5 {
              margin: 0;
              margin-top: 7px;
              font-size: 15px;
              color: #000000;
            }
      
            ul {
              list-style-type: disc;
              margin-left: 15px;
            }
      
            .text-under {
              text-align: center;
              font-size: 12px;
              color: #555;
            }
      
            .footer {
              background-color: #f2f2f2;
              padding: 7px 0;
            }
      
            .copyright {
              color: #000000;
              text-align: center;
              padding: 10px;
            }
      
            .container-two p {
              margin: 0;
              margin-top: 15px;
              margin-bottom: 15px;
              font-size: 15px;
              color: #333;
            }
      
            a {
              text-decoration: none;
              color: rgba(104, 85, 224, 1);
            }
      
            a:hover {
              color: rgba(150, 70, 200, 1);
            }
      
            .feature-list {
              margin: 20px 0;
            }
      
            .feature-list h2 {
              color: rgba(104, 85, 224, 1);
              text-align: center;
            }
      
            .feature-list ul {
              padding: 0;
              list-style-type: none;
            }
      
            .feature-list ul li {
              background-color: #f9f9f9;
              margin: 10px 0;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
              color: #333;
            }
          </style>
        </head>
      
        <body>
          <div class="container">
            <h1>Polska Dezerter</h1>
            <hr />
            <h3>Dzień Dobry,</h3>
            <div class="container-two">
              <p>
                Dziękujemy za rejestrację w naszej aplikacji
                <a href="https://coc.glazlukasz.pl" target="_blank"
                  >coc.glazlukasz.pl</a
                >
                tworzonej przez zespół "glazlukasz.pl".
              </p>
      
              <p>
                Nasz zespół wsparcia technicznego glazlukasz.pl jest dostępny, aby
                pomóc Ci w razie problemów z aplikacją lub logowaniem. Prosimy o
                kontakt na adres e-mailowy:
                <a href="mailto:kontakt@glazlukasz.pl">kontakt@glazlukasz.pl</a>.
              </p>
      
              <p>
                Twoje zgłoszenie jest ważne dla nas, i chcemy zapewnić Ci jak
                najszybszą i najbardziej satysfakcjonującą pomoc.
              </p>
              <p>Cieszymy się, że jesteś częścią naszej społeczności.</p>
              <hr />
              <p>
                Dziękujemy za wybór naszego serwisu glazlukasz.pl oraz
                coc.glazlukasz.pl i za to, że jesteś częścią naszej społeczności. Nasz
                rozwijający się zespół nieustannie pracuje nad doskonaleniem naszej
                strony internetowej i ceni sobie Twoją opinię.
              </p>
            </div>
      
            <div class="feature-list">
              <h2>Główne funkcje aplikacji Polska Dezerter - Clash of Clans:</h2>
              <ul>
                <li>Panel logowania i rejestracji dla użytkowników</li>
                <li>Przeglądanie listy graczy dodanych przez administratora</li>
                <li>Wyświetlanie statystyk graczy oraz klanu</li>
                <li>Zarządzanie klanem przez administratora</li>
                <li>
                  Bezpieczne mechanizmy uwierzytelniania i przechowywania danych
                </li>
                <li>W trakcie budowy nowych funkcji</li>
              </ul>
            </div>
      
            <h4>Z poważaniem,</h4>
            <h5>Zespół glazlukasz</h5>
      
            <hr />
            <p class="text-under" style="margin-top: 20px">
              Chcielibyśmy poinformować, że ta wiadomość email została wygenerowana
              automatycznie przez nasz system. Prosimy więc o nieodpowiadanie na tą
              wiadomość e-mail.
            </p>
      
            <p class="text-under">
              W związku z wysyłanymi przez nas wiadomościami e-mail, pragniemy zwrócić
              uwagę na kwestię praw autorskich. Treść wiadomości oraz wszelkie
              załączniki stanowią naszą własność intelektualną i są chronione
              przepisami prawa autorskiego. Ochrona ta obejmuje m.in. zakaz
              kopiowania, rozpowszechniania oraz wykorzystywania tych treści w celach
              komercyjnych bez naszej zgody.
            </p>
          </div>
          <div class="footer">
            <p class="copyright">
              © 2024 glazlukasz.pl | coc.glazlukasz.pl. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </body>
      </html>      
`;
    case MailKey.forgotPassword:
      return `
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resetowanie Hasła - glazlukasz</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
      
          h1 {
            color: rgba(104, 85, 224, 1);
            font-size: 28px;
            text-align: center;
          }
      
          h3 {
            font-size: 18px;
            margin-top: 15px;
            color: #333;
          }
      
          h2, h3 {
            color: #000000;
          }
      
          h4, h5 {
            margin: 0;
            margin-top: 7px;
            font-size: 15px;
          }
      
          ul {
            list-style-type: disc;
            margin-left: 15px;
          }
      
          .text-under {
            text-align: center;
            font-size: 12px;
            color: #555;
          }
      
          .footer {
            background-color: #f2f2f2;
            padding: 7px 0;
          }
      
          .copyright {
            color: #000000;
            text-align: center;
            padding: 10px;
          }
      
          .container-two p {
            margin: 0;
            margin-top: 15px;
            margin-bottom: 15px;
            font-size: 15px;
            color: #333;
          }
      
          a {
            text-decoration: none;
            color: rgba(104, 85, 224, 1);
          }
      
          a:hover {
            color: rgba(150, 70, 200, 1);
          }
      
          p {
            color: #000000;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h1>glazlukasz</h1>
          <hr />
          <h3>Dzień Dobry, ${(variables as any).firstName}</h3>
          <div class="container-two">
            <p>
              Otrzymujesz tę wiadomość, ponieważ wysłałeś prośbę o zresetowanie hasła w naszej aplikacji.
            </p>
      
            <p>
              Aby zresetować hasło, kliknij ten link: 
              <a href="${(variables as any).resetLink}">${
        (variables as any).resetLink
      }</a>
            </p>
      
            <p>
              Twój kod autoryzujący zresetowanie hasła jest ważny przez 10 minut. Po upływie tego czasu będziesz musiał(a) ponownie zresetować hasło.
            </p>
          </div>
          <hr />
          <p class="text-under" style="margin-top: 20px">
            Chcielibyśmy poinformować, że ta wiadomość email została wygenerowana automatycznie przez nasz system. Prosimy więc o nieodpowiadanie na tą wiadomość e-mail.
          </p>
      
          <p class="text-under">
            W związku z wysyłanymi przez nas wiadomościami e-mail, pragniemy zwrócić uwagę na kwestię praw autorskich. Treść wiadomości oraz wszelkie załączniki stanowią naszą własność intelektualną i są chronione przepisami prawa autorskiego. Ochrona ta obejmuje m.in. zakaz kopiowania, rozpowszechniania oraz wykorzystywania tych treści w celach komercyjnych bez naszej zgody.
          </p>
        </div>
        <div class="footer">
          <p class="copyright">© 2024 glazlukasz.pl | coc.glazlukasz.pl. Wszelkie prawa zastrzeżone.</p>
        </div>
      </body>
      </html>      
  `;
  }
}

function getSubject(key: MailKey) {
  switch (key) {
    case MailKey.signup:
      return "| glazlukasz.pl | Dziękujemy za rejestrację!";

    case MailKey.forgotPassword:
      return "| glazlukasz.pl | Resetowanie hasła";
  }
}

export async function sendMail(
  to: string,
  mailKey: MailKey,
  variables: { [key: string]: string } | undefined = undefined
) {
  await transport.sendMail({
    from: NODEMAILER_USER,
    to,
    subject: getSubject(mailKey),
    html: getContent(mailKey, variables),
  });
}
