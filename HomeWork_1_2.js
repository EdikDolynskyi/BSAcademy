
var Man = {
    constructor: function(name, age){
        this.name = name;
        this.age = age;
        return this;
    },
    live: function(){
        console.log('Hi, my name is ' + this.name + ', and i live in Rakoshyno!');
        return this;
    }
};

var man = Object.create(Man).constructor('Ivan', 20);

var Student = Object.create(Man);
    Student.constructor = function(name, age){
        Man.constructor.apply(this, arguments);
        this.study = function(){
            console.log('Hi, my name is ' + this.name + ', and i study at bursa');
        };
        return this;
    };
var student = Object.create(Student).constructor('Petro', 23);


man.live();

student.live();
student.study();

function duckType(obj) {
    if (obj.live && obj.study) {
        return "student";
    }
    else if (obj.live) {
        return "man";
    }
    else return "Error";
}

function duckTypeModify() {
    if (this.live && this.study) {
        return "student";
    }
    else if (this.live) {
        return "man";
    }
    else return "Error";
}


var teacher = {};

console.log('This object type ' + duckType(man));
console.log('This object type ' + duckType(student));
console.log('This object type ' + duckType(teacher));

console.log('This object type ' + duckTypeModify.call(man));
console.log('This object type ' + duckTypeModify.call(student));
console.log('This object type ' + duckTypeModify.call(teacher));



