var btn_campos = document.getElementById("campos_login");
var text = document.getElementsByClassName("text_content");
var btn_login = document.getElementById("botao-login");
var email_login = document.getElementById("email_login");
var password_login = document.getElementById("password_login");
var fatos = document.getElementsByClassName("fatos");
var token;

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
            token = response.data.token;
            console.log("token: " + token);
            document.getElementById("logged").style.display = "inline-block";
            localStorage.setItem("Online", true);
            document.getElementById("login_content").style.display = 'none';
        }
        else
        {
            localStorage.setItem("Online", false);
        }
    }
    )
    .catch (function (error) {
        document.getElementById("invalid").style.display = 'block';
        document.getElementById("invalid").innerHTML = ("Email not founded");
        return false;
    })
}
function campo_login (el)
{
    var display = document.getElementById(el).style.display;

    if (localStorage.getItem("Online") == "true")
    {
        document.getElementById(el).style.display = 'none';
        document.getElementById("img_content").style.display = 'none';
        document.getElementById("logged").style.display = "inline-block";
    }
    else if (display == "none")
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
        document.getElementById("email_login").innerHTML = ("");
        document.getElementById("password_login").innerHTML = ("");
    }
}
btn_login.addEventListener('click', (event) => {
    event.preventDefault();

    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    if(!emailRegex.test(email))
    {
        localStorage.setItem("Online", false);
        document.getElementById("invalid").style.display = 'block';
        document.getElementById("invalid").innerHTML = ("Invalid email");
        return false;
    }
    else if ((email == localStorage.getItem("Username")) && password == localStorage.getItem("Password"))
    {
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
    document.getElementById("fato").style.display = "block";
    var num = document.getElementById("number").value;
    var i;
    if (num == 1)
    {
        axios.get('https://cat-fact.herokuapp.com/facts/random')
        .then(function(response){
                var novo_fato = ("- "+response.data.text);
                var lista  = document.getElementById("lista_fatos").innerHTML;
                lista = lista +"<li>"+novo_fato+"</li>";
                document.getElementById("lista_fatos").innerHTML = lista;
    })
    }
    else
    {
        axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount="+num)
        .then(function(response){
            for (i = 0; i < num; i++)
            {
            var novo_fato = ("- "+response.data[i].text);
            var lista  = document.getElementById("lista_fatos").innerHTML;
            lista = lista +"<li>"+novo_fato+"</li>";
            document.getElementById("lista_fatos").innerHTML = lista;
        }
})
    }        
    }

function exit() {
    localStorage.setItem("Online", false);
    var reset = "";
    document.getElementById("logged").style.display = "none";
    document.getElementById("invalid").style.display = "none";
    document.getElementById("fato").style.display = "none";
    campo_login("text_content");
}