

db.students.find({
    scores: {
        $elemMatch: {
            score: {
                $gte: 93,
                $lt: 95
            }
        }
    }
}).pretty();

db.students.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match:
        {
            "scores.type": "exam",
            "scores.score":
            {
                $gt:90
            }
        }
    }
]).pretty()

//Здесь вариант с более читабельным результатом
db.students.aggregate([
    {
        $unwind: "$scores"
    },
    {
        $match:
        {
            "scores.type": "exam",
            "scores.score":
            {
                $gt:90
            }
        }
    },
    {
        $project:
        {

            "Student name": "$name",
            "Examing score":"$scores.score",
            _id: false
        }
    }
]).pretty()

db.students.update(
    {
        name:"Vinnie Auerbach"
    },
    {
        $set:
        {
            accepted:true
        }
    },
    {
        multi:true
    }

)

