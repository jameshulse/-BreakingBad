var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var elements = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl",
    "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br",
    "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",
    "Xe", "Cs", "Ba", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];

function breakBad(name) {
    var matches = [];

    for (var i = 0; i < elements.length; i++) {
        var index = name.toLowerCase().indexOf(elements[i].toLowerCase());

        if (index != -1) {
            console.log('Found:', elements[i]);

            matches.push({
                element: elements[i],
                index
            });
        }
    }

    var match = matches[Math.floor(Math.random() * matches.length)];

    return name.substring(0, match.index)
        + `<span class="name-element">${match.element}</span>`
        + name.substring(match.index + match.element.length);
}

app.get('/:name', (req, res) => {
    res.render('index', {
        name: breakBad(req.params.name)
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});