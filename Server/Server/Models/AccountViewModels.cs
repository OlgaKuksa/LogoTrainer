using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Logotrainer.Server.Models
{
    // Models returned by AccountController actions.
    public class ExternalLoginConfirmationViewModel
    {
        [Required, Display(Name = "Электронная почта")] public string Email { get; set; }

        [Display(Name = "Hometown")] public string Hometown { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required] public string Provider { get; set; }

        [Required, Display(Name = "Code")] public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")] public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required, Display(Name = "Электронная почта")] public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required, Display(Name = "Электронная почта"), EmailAddress] public string Email { get; set; }

        [Required, DataType(DataType.Password), Display(Name = "Пароль")] public string Password { get; set; }

        [Display(Name = "Оставаться в системе?")] public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required, EmailAddress, Display(Name = "Электронная почта")] public string Email { get; set; }

        [Required, StringLength(100, ErrorMessage = "{0} не может быть короче {2} символов.", MinimumLength = 6),
         DataType(DataType.Password), Display(Name = "Пароль")] public string Password { get; set; }

        [DataType(DataType.Password), Display(Name = "Повторите пароль"),
         Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        [Display(Name = "Hometown")] public string Hometown { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required, EmailAddress, Display(Name = "Электронная почта")] public string Email { get; set; }

        [Required, StringLength(100, ErrorMessage = "{0} не может быть короче {2} символов.", MinimumLength = 6),
         DataType(DataType.Password), Display(Name = "Пароль")] public string Password { get; set; }

        [DataType(DataType.Password), Display(Name = "Повторите пароль"),
         Compare("Password", ErrorMessage = "Пароли не совпадают")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required, EmailAddress, Display(Name = "Электронная почта")] public string Email { get; set; }
    }
}