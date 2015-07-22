describe('Testing objects Man, Student, Professor', function () {

    //beforeEach(function () {
    //    var man = new Man('Ivan', 20);
    //    var student = new Student('Petro', 25);
    //    var professor = new Professor('Sergey', 60);
    //});


    describe('Object man', function () {

        it('must be name of man is Ivan', function () {
            expect(man.name).toEqual('Ivan')
        });

        it('must be age of man is 20', function () {
            expect(man.age).toEqual(20)
        });

        it('must be live in Mukachevo', function () {
            expect(man.live('Mukachevo')).toEqual('Hi, my name is Ivan, and i live in Mukachevo')
        });

        it('if man is christian', function () {
            expect(man.christian).toBeTruthy()
        });
        it('if man have method Study', function () {
            expect(man.study).toBeFalsy()
        });

    });

    describe('Object student', function () {

        it('must be name of student is Petro', function () {
            expect(student.name).toEqual('Petro')

        });

        it('must be age of student is 25', function () {
            expect(student.age).toEqual(25)
        });

        it('must be live in Perechun', function () {
            expect(student.live('Perechun')).toEqual('Hi, my name is Petro, and i live in Perechun')
        });

        it('must be study in hungary', function () {
            expect(student.study('hungary school')).toEqual('Hi, my name is Petro, and i study at hungary school')
        });

        it('if student is christian', function () {
            expect(student.christian).toBeFalsy()
        });
    });

    describe('Object professor', function () {

        it('must be name of professo is Sergey', function () {
            expect(professor.name).toEqual('Sergey')
        });

        it('must be age of professor is 60', function () {
            expect(professor.age).toEqual(60)
        });

        it('must be rezult = value * value', function () {
            expect(professor.teach(25)).toEqual(625)
        });

        it('professors subjects should contain Physics', function () {
            expect(professor.subjects).toContain('Physics');
        });

        it('must be greater than 50', function () {
            expect(professor.age).toBeGreaterThan(50);
        });

        it('professor have experience', function () {
            expect(professor.setExperience(50)).toEqual(50);
        });

        it('professors can`t have this experience', function () {
            expect(function () {
                professor.setExperience(70)
            }).toThrowError('Professor is too young for this experience!');
        });

        it('check professor`s conscience', function () {
            expect(professor.checkConscience()).toEqual(professor.name + ' is a decent man');
        });

        it('check professor`s conscience', function () {
            professor.bribeTaker = true;
            expect(function () {
                professor.checkConscience()
            }).toThrowError('He is a bad man');
        });

        it('professor get a bribe', function () {
            expect(professor.getBribe(150)).toEqual('Congratulations! You pass exam');
        });

        it('professors don`t get a bribe', function () {
            expect(function() {
                professor.getBribe(70)
            }).toThrowError('No-no-no, give me more!');
        });
    });
});
