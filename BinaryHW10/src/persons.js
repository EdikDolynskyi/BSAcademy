function Man(name, age) {
    this.name = name;
    this.age = age;
    this.christian = true;
}

Man.prototype.live = function (city) {
    return ('Hi, my name is ' + this.name + ', and i live in ' + city);
};

function Student(name, age) {
    Man.apply(this, arguments);
    this.christian = false;
}
Student.prototype = new Man();

Student.prototype.study = function (school) {
    return ('Hi, my name is ' + this.name + ', and i study at ' + school);
};

function Professor(name, age) {
    this.name = name;
    this.age = age;
    this.experience = 0;
    this.subjects = [];
    this.bribeTaker = false;
}

Professor.prototype.teach = function (value) {
    return value * value;
};
Professor.prototype.setExperience = function (experience) {
    if(experience < this.age){
        this.experience = experience;
        return experience;
    }
    else {
        throw new Error('Professor is too young for this experience!');
    }

};

Professor.prototype.getBribe = function (bribe) {
    if(bribe > 100){
        this.bribeTaker = true;
        return 'Congratulations! You pass exam';
    }
    else {
        throw new  Error('No-no-no, give me more!')
    }
};
Professor.prototype.checkConscience = function () {
    if(this.bribeTaker == false){
        return this.name + ' is a decent man' ;
    }
    else {
        throw new  Error('He is a bad man')
    }
};

var man = new Man('Ivan', 20);
var student = new Student('Petro', 25);
var professor = new Professor('Sergey', 60);

professor.subjects = ['English', 'Physics', 'Mathematics'];

console.log(professor.bribeTaker);

