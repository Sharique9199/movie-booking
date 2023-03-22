document.querySelector('#back-button').addEventListener('click', () => {
    location.href = './index.html'
})

document.querySelector("#form").addEventListener("submit",submitFun)
function submitFun(){
    event.preventDefault();
    console.log("clicked me");
    location.href="./thankyou/thankyou.html"
}