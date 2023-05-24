(function ($) {

    'use strict';

    const functions = {
        init: () => {
            functions.mobileToggle();
            functions.tabs();
            functions.accordion();
            functions.dropdown();
            functions.toggler();
            functions.datepicker();
            functions.settingsForm();
            functions.common();
            functions.onResize();
        },

        mobileToggle: () => {
            const $body = $('body')
            const $toggle = $('[data-menu-toggle]')
            const $nav = $('[data-menu-nav]')

            $toggle.on('click', () => {
                $body.toggleClass('lock')
                $toggle.toggleClass('open')
                $nav.toggleClass('open')
            })
        },

        tabs: () => {
            const $tab = $('[data-tab-body]');
            const $nav = $('[data-tab-nav]');

            $tab.hide().filter(':first').show();

            $nav.on('click', function(e) {
                e.preventDefault()

                $tab.hide();
                $tab.filter(this.hash).show();
                $nav.removeClass('active');
                $(this).addClass('active');
                return false;
            }).filter(':first').click();
        },
        
        accordion: () => {
            const $acc = $('[data-acc-body]');
            const $nav = $('[data-acc-nav]');

            $acc.hide().filter(':first').show();

            $nav.on('click', function(e) {
                e.preventDefault()

                $acc.hide();
                $acc.filter(this.hash).show();
                $nav.removeClass('active');
                $(this).addClass('active');
                return false;
            }).filter(':first').click();
        },

        dropdown: () => {
            $('[data-dropdown-toggle]').on('click', function() {
                $(this).next('[data-dropdown]').slideToggle();
            });

            $(document).click(function(e) {
                const target = e.target;
                if (!$(target).is('[data-dropdown-toggle]') && !$(target).parents().is('[data-dropdown-toggle]')) {
                    $('[data-dropdown]').slideUp();
                }
            });
        },

        toggler: () => {
            $('[data-toggle]').on('click', function() {
                $(this).next('[data-toggle-target]').slideToggle('fast');
                $(this).parent().toggleClass('toggle');
            });
        },

        datepicker: () => {
            try {
                const picker = document.querySelector('[data-datepicker]');
                const datepicker = new Datepicker(picker);
            } catch (e){}

            try {
                const range = document.querySelector('[data-datepicker-range]');
                const rangepicker = new DateRangePicker(range);
            } catch (e){}
        },

        settingsForm: () => {
            const $form = $('#settingsForm');
            const $name = $('input[name="name"]', $form);
            const $surname = $('input[name="surname"]', $form);
            const $email = $('input[name="email"]', $form);
            const $password = $('input[name="password"]', $form);
            const $passwordRepeat = $('input[name="password_repeat"]', $form);

            let requared = false;
            const error = ($el) => {
                requared = false;
                $el.parents('.form-line').addClass('error');
            }
            const valid = ($el) => {
                requared = true;
                $el.parents('.form-line').removeClass('error');
            }

            $form.on('click', 'button', (e) => {
                e.preventDefault()

                // check name
                validator.isEmpty($name.val()) ? error($name) : valid($name);

                // check surname
                validator.isEmpty($surname.val()) ? error($surname) : valid($surname);

                // check email
                !validator.isEmail($email.val()) ? error($email) : valid($email);

                // check password
                !validator.isStrongPassword($password.val()) ? error($password) : valid($password);
                !validator.isStrongPassword($passwordRepeat.val()) || ($passwordRepeat.val() !== $password.val()) ? error($passwordRepeat) : valid($passwordRepeat);

                if (requared) return true;

                return false;
            })
        },

        common: () => {
            // selectric.js
            try {
                $('[data-select]').selectric();

                $('[data-select-custom]').selectric({
                    optionsItemBuilder: function(itemData, element, index) {
                        return `<img src="dist/images/${itemData.value}.svg" alt="${itemData.text}"> ${itemData.text}`
                    },
                    labelBuilder: function(currItem) {
                        return `<img src="dist/images/${currItem.value}.svg" alt="${currItem.text}"> ${currItem.text}`
                    },
                });

            } catch (e){}

            // clipboard.js
            try {
                const clipboard = new ClipboardJS('[data-clipboard]');

                clipboard.on('success', function (e) {
                    const id = e.trigger.getAttribute('data-clipboard-target');
                    id ? $(id).select() : $(e).select()
                });
            } catch (e){}

            // fancybox.js
            Fancybox.bind("[data-fancybox]", {
                Html: {
                    video: {
                        autoplay: true,
                    }
                },
            })
        },

        onResize: () => {
            window.addEventListener("resize", function () {
            }, false);
        },
    };

    // Run the function
    $(function () {
        functions.init();
    });
})(jQuery);