//TODO: update file


db.routes.find({}, {"properties.RTE_NUM": 1, _id:0}).sort({"properties.RTE_NUM": 1})
