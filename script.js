$(document).ready(function() {

    // --- LETTER-ONLY FIELDS ---
    const letterFields = [
        {id: '#firstName', name: 'First Name'},
        {id: '#lastName', name: 'Last Name'},
        {id: '#middleInitial', name: 'Middle Initial'}
    ];

    letterFields.forEach(field => {
        $(field.id).on('input', function() {
            const val = $(this).val().trim();
            if (val !== '' && /^[A-Za-z]+$/.test(val)) {
                setSuccess($(this));
            } else {
                removeError($(this));
            }
        }).on('blur', function() {
            const val = $(this).val().trim();
            if (val === '') {
                setError($(this), `Enter your ${field.name} is required`);
            } else if (!/^[A-Za-z]+$/.test(val)) {
                setError($(this), `${field.name} must contain letters only`);
            } else {
                setSuccess($(this));
            }
        });
    });

    // --- NUMBER-ONLY FIELDS ---
    const numberFields = [
        {id: '#studentID', name: 'Student ID', pattern: /^[\d-]+$/},
        {id: '#contactNumber', name: 'Contact Number', pattern: /^\d+$/}
    ];

    numberFields.forEach(field => {
        $(field.id).on('input', function() {
            const val = $(this).val().trim();
            if (val !== '' && field.pattern.test(val)) {
                setSuccess($(this));
            } else {
                removeError($(this));
            }
        }).on('blur', function() {
            const val = $(this).val().trim();
            if (val === '') {
                setError($(this), `Enter your ${field.name} is required`);
            } else if (!field.pattern.test(val)) {
                setError($(this), `${field.name} must contain numbers only`);
            } else {
                setSuccess($(this));
            }
        });
    });

    // --- SELECT FIELDS ---
    const selectFields = [
        {id: '#course', name: 'Course'},
        {id: '#yearLevel', name: 'Year Level'},
        {id: '#gender', name: 'Gender'}
    ];

    selectFields.forEach(field => {
        $(field.id).on('blur change', function() {
            const val = $(this).val();
            if (!val) {
                setError($(this), `Enter your ${field.name} is required`);
            } else {
                setSuccess($(this));
            }
        });
    });

    // --- DATE FIELD ---
    $('#dob').on('input', function() {
        if ($(this).val().trim() !== '') {
            setSuccess($(this));
        } else {
            removeError($(this));
        }
    }).on('blur', function() {
        const val = $(this).val().trim();
        if (!val) {
            setError($(this), 'Enter your Date of Birth is required');
        } else {
            setSuccess($(this));
        }
    });

    // --- TERMS CHECKBOX ---
    $('#terms').on('change', function() {
        if (this.checked) {
            setSuccess($(this));
        } else {
            setError($(this), 'You must accept the terms');
        }
    });

    // --- HELPER FUNCTIONS ---
    function setError(input, message) {
        input.addClass('error shake').removeClass('success');
        showError(input, message);
        setTimeout(() => input.removeClass('shake'), 200); // remove shake after animation
    }

    function setSuccess(input) {
        input.addClass('success').removeClass('error shake');
        removeError(input);
    }

    function showError(input, message) {
        let errorSpan = input.next('.error-msg');
        if (errorSpan.length === 0) {
            input.after(`<span class="error-msg">${message}</span>`);
        } else {
            errorSpan.text(message);
        }
    }

    function removeError(input) {
        input.next('.error-msg').remove();
    }

    // --- FORM SUBMISSION ---
    $('form').on('submit', function(e) {
        // Trigger validation on all fields
        letterFields.forEach(f => $(f.id).trigger('blur'));
        numberFields.forEach(f => $(f.id).trigger('blur'));
        selectFields.forEach(f => $(f.id).trigger('blur'));
        $('#dob').trigger('blur');
        $('#terms').trigger('change');

        if ($('.form-group .error').length > 0 || !$('#terms').is(':checked')) {
            e.preventDefault();
            alert('Please fix all errors before submitting.');
        } else {
            $('#successMessage').html('<i class="fas fa-check-circle"></i> Registration Successful!').addClass('show');
        }
    });

});
