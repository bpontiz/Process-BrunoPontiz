const getNameSelector = document.getElementById("nameIdSelector");

const requestName = req.session.name;

getNameSelector.innerHTML = `<p>Welcome ${requestName}</p`;