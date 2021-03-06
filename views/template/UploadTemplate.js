// Global letiables

//to count the number of files being uploaded at once
let num = 1;


// Runs afterLoading function after the page loads
$(afterLoading);


function afterLoading() {
    // Create first form
    let form1 = new UploadTemplate();
    form1.populateTemplate();

    // User cannot remove a form if only one form is there on the screen
    $('#formContainer .removeBtn').attr('disabled', true);


    // Creates another form when user clicks on Add Another Question Paper button
    $('#addTemplateButton').click(function () {
        addTemplate();
    });

    // Submit the form
    $('#submit').click(function () {

        submit();
    });

    // As forms can be dynamically added or removed
    // this on click listener on formContainer which listens for
    // any click on a button with removeBtn class
    $('#formContainer').on('click', '.removeBtn', function (item) {
        item.stopPropagation();

        // User cannot remove a form if only one form is there
        if (num <= 1) {
            $(this).attr('disabled', true);
        }
        // User can remove a form if there are more than one forms
        else {
            $(this).parent().remove();
            // Maintains count of total forms
            num--;
            // If after deleting only one form is left it cannot be deleted
            if (num <= 1) {
                $('#formContainer .removeBtn').attr('disabled', true);
            }
        }
    });
}

// Class used to make a form and propagate it
class UploadTemplate {
    // Method which makes a form
    populateTemplate() {
        if ('content' in document.createElement('template')) {
            // Select form template and container in which it needs to be appended
            let template = $('#uploadtemplate');
            let formcontainer = $('#formContainer');

            // Append form template at the end of the container
            formcontainer.append(template.html());
        } else {
            window.alert('HTML Template is not supported by Browser');
        }
    }
}


//Function to add form Template
function addTemplate() {
    let temp = new UploadTemplate();
    temp.populateTemplate();
    // we need to activate remove button of the first form when
    // we add a form and only one form is there on the screen
    // before adding second form
    if (num <= 1) {
        resetAllRemoveButtons();
    }
    // Maintains count of total forms
    num++;
}


// Sets disabled attribute of all remove buttons to be false
function resetAllRemoveButtons() {
    $('#formContainer .removeBtn').attr('disabled', false);
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    return profile.getEmail();
}

function submit() {
    let email = onSignIn(googleUser);
    if (email.includes("@mnnit.ac.in"))
        uploadPreprocessing(email, num);
    else {
        alert("Please sign in using Institute Email ID");
    }
}
