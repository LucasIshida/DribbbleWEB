var btn_campos = document.getElementById("campos_login");
var text = document.getElementsByClassName("text_content");
var btn_login = document.getElementById("botao-login");
var email_login = document.getElementById("email_login");
var password_login = document.getElementById("password_login");

async function login_reqres (email, password)
{
    await axios.post('https://reqres.in/api/login', 
    {
        email: email,
        password: password
    })
    
    .then(function (response)
    {
        if (response.status == 200)
        {
            document.getElementById("logged").style.display = "inline-block";
            localStorage.setItem("Online", true);
        }
    }
    )
    .catch (function (error) {
        alert ('Invalid datas');
        return false;
    })
}
function campo_login (el)
{
    var display = document.getElementById(el).style.display;
    if (display == "none")
    {
        document.getElementById(el).style.display = 'inline-block';
        document.getElementById("img_content").style.display = 'block';
        document.getElementById("login_content").style.display = 'none';
    }
    else
    {
        document.getElementById(el).style.display = 'none';
        document.getElementById("img_content").style.display = 'none';
        document.getElementById("login_content").style.display = 'flex';
    }
}
btn_login.addEventListener('click', (event) => {
    event.preventDefault();

    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;

    if ((email == localStorage.getItem("Username")) && password == localStorage.getItem("Password"))
    {
        alert("Login sucessfull");
        localStorage.setItem("Online", true);
    }

    else
    {
        login_reqres (email, password);
        return true;
    }

    return true;
})

function buscarFatos() {
    axios.get('https://cat-fact.herokuapp.com/facts/random')
        .then(function(response){
            console.log(response.data)
            document.getElementById("fato").innerHTML = ("Fact: " +response.data.text);
})
}