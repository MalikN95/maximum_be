export const PROJECT_NAME = 'maximum';
export const PASSWORD_RESET_EMAIL_TITLE = 'Восстановление пароля.';
export const ACCOUNT_CREATED = 'Приглашение в платформу.';

export const passwordResetEmail = (newToken: string): string => `
<div style="border: #0aaf60 solid 2px; width: 90%; max-width:450px; border-radius: 15px; text-align: center; padding: 15px; margin: 0 auto;">
    <h2>Перейдите по ссылке чтобы восстановить пароль</h2>
    <a style="color:#fff; font-size: 20px; border-radius: 10px; padding: 15px; background-color: #0aaf60; display: block;" href="${process.env.FRONTEND_URL}/auth/reset-password/${newToken}">Восстановить</a>
</div>
`;

export const sendInviteMail = (password: string): string => `
<div style="border: #0aaf60 solid 2px; width: 90%; max-width:450px; border-radius: 15px; text-align: center; padding: 15px; margin: 0 auto;">
    <h2>Перейдите по ссылке чтобы войти</h2>
    <p>Ваш временный пароль: ${password}</p>
    <a style="color:#fff; font-size: 20px; border-radius: 10px; padding: 15px; background-color: #0aaf60; display: block;" href="${process.env.FRONTEND_URL}/auth/login">Войти</a>
</div>
`;

export const accountCreateEmail = (email: string, newToken: string): string => `
<div style="border: #2E4B99 solid 2px; width: 90%; max-width:450px; border-radius: 15px; text-align: center; padding: 15px; margin: 0 auto;">
    <h2 style="color:#000;"> Ihr LGH Account wurde erstellt. </h2>
    <p style="color:#000;"> Hallo, Ihr LGH Account wurde erstellt. Bitte nutzen Sie Ihre E-mail zum Login. </p>
    <p style="color:#000;"> E-mail: ${email} </p>
    <a style="color:#fff; font-size: 20px; border-radius: 10px; padding: 15px; background-color: #2E4B99; display: block; text-decoration: none;" href="${process.env.FRONTEND_URL}/auth/reset-password?token=${newToken}">Neues Passwort setzen</a>
</div>
`;
