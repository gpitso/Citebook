	const mongoose = require("mongoose");
	const express = require("express");
	const app = express();
	const user = require("./models/user");
	const account = require("./models/account");
	const paper = require("./models/paper");
	const declared_citations = require("./models/Declared_citations");
	const archived_citations = require("./models/Archived_citations");

	const https = require('https');


	
	const bodyParser = require('body-parser');
	var fs = require('fs');




	const router = express.Router();
	const port = process.env.PORT || 5001;

	app.use(bodyParser.json({limit: '500kb'}));
	app.use(bodyParser.urlencoded({ extended: true }));

	var uri = "mongodb://localhost:27017/Citebook";

	mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

	const db = mongoose.connection;

	db.once("open", function() {
	console.log("MongoDB database connection established successfully");
	});

	app.use("/", router);

	app.listen(port, function() {
	console.log("Server is running on Port: " + port);
	});


	router.post("/api/newuser",async (req, res)=>{  //CREATE USER AND ACCOUNT DOCUMENT

    	URL = 'image/png'; 
		const newuser={
			fname:req.body.params.fname,
			lname:req.body.params.lname,
			email:req.body.params.email,
			password:req.body.params.password,
			level:req.body.params.level,
			active_papers:req.body.params.active_papers,
			papers_no:req.body.params.papers_no,
			citation_points:6,
			penalty_points:req.body.params.penalty_points,
			papers_to_be_confirmed:req.body.params.papers_to_be_confirmed,
			img: URL,
			friends:req.body.params.friends,
			papers:req.body.params.papers,
			img:req.body.params.img
		}
		user.create(newuser,function(err, result) {
				if (err) {
				res.send("Unique");
				} else {
					var newaccount = 
					{
						email: newuser.email,
						password: newuser.password,
						user_id:result._id,
						active:"0"
					}
					account.create(newaccount, function(err, result) {
								if (err) {
									console.log(err);
								res.send("Unique");
								} else {
								res.send("Account Registration completed");
								}
					})
				}
		})

	});

	router.post("/api/logingoogle",async (req, res)=>{  //LOGIN USER GMAIL

    	URL = 'image/png'; 
		const newuser={
			fname:req.body.params.fname,
			lname:req.body.params.lname,
			email:req.body.params.email,
			password:req.body.params.password,
			papers_to_be_confirmed:'0',
			level:0,
			active_papers:0,
			papers_no:0,
			citation_points:6,
			penalty_points:0,
			img: '0',
			friends:'0',
			papers:'0',
			img:req.body.params.img
		}
		user.create(newuser,async function(err, result) {
				if (err) {
					const foundAccount = await user.findOne ({ "email" : req.body.params.email ,"password": req.body.params.password});
					if(foundAccount) res.send(foundAccount);
					else res.send("Invalid Email or Password, Try again");
				} else {
					const foundAccount = await user.findOne ({ "email" : req.body.params.email ,"password": req.body.params.password});
					if(foundAccount) res.send(foundAccount);
					else res.send("Invalid Email or Password, Try again");
				}
		})

	});

	router.route("/api/getusers").get(async function(req, res) { //GET ALL USERS IN THE DATABASE
		user.find({}, function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
		});
	});


	router.get("/api/user/:id", async (req, res) => { //GET SPECIFIC USER IN THE DATABASE
		user.findOne({ _id: req.params.id }, function(err, result) {
			if (err) {
			res.send(err);
			} else {
			res.send(result);
			}
		});
	})

	// router.route("/api/makefriend").post(function(req, res) { //MAKE FRIENDSHIP
	// 				user.findByIdAndUpdate(req.body.params.user_id,{$push: {friends: req.body.params.friend_id}},{useFindAndModify: false}, function(err, result){})
	// 				user.findByIdAndUpdate(req.body.params.friend_id,{$push: {friends: req.body.params.user_id}},{useFindAndModify: false}, function(err, result){})
	// 				res.send("giorgos");		
	// })

	router.route("/api/makefriend").post(async function(req, res) { //MAKE FRIENDSHIP
		console.log("makefriend")
					user.findByIdAndUpdate(req.body.params.user_id,{$push: {friends: req.body.params.friend_id}},{useFindAndModify: false}, function(err, result){})
					user.findByIdAndUpdate(req.body.params.friend_id,{$push: {friends: req.body.params.user_id}},{useFindAndModify: false}, function(err, result){})

					await user.findByIdAndUpdate(
						{ "_id": req.body.params.user_id  },
						{ $pull: { requests: { $in: [req.body.params.friend_id] } }},
						function(err, result) {
							if (err) {
							res.send(err);
							} else {
							res.send("giorgos");
							}
						}
						);		
	})


	router.route("/api/declinefriend").post(async function(req, res) { //MAKE FRIENDSHIP

		await user.findByIdAndUpdate(
			{ "_id": req.body.params.user_id  },
			{ $pull: { requests: { $in: [req.body.params.friend_id] } }},
			function(err, result) {
				if (err) {
				res.send(err);
				} else {
				res.send("giorgos");
				}
			}
			);		
})

	router.route("/api/makerequest").post(function(req, res) { //MAKE FRIENDSHIP
		user.findByIdAndUpdate(req.body.params.friend_id,{$push: {requests: req.body.params.user_id}},{useFindAndModify: false}, function(err, result){})
		res.send("giorgos");		
	})

	router.get("/api/datediff/:id", async (req, res) => { //GET DATE DIFFERENCE OF DECLARED CITATIONS TABLE
		const x = await declared_citations.aggregate( [ { $project: { _id: req.params.id, declared_date : 1, dateDifference: { $subtract: [  new Date(), "$declared_date" ] } } } ] )
		res.send(x)
	})

	router.get("/api/datediffarchived/:id", async (req, res) => { //GET DATE DIFFERENCE OF ARCHIVED CITATIONS TABLE
		const x = await archived_citations.aggregate( [ { $project: { _id: req.params.id, declared_date : 1, dateDifference: { $subtract: [  new Date(), "$declared_date" ] } } } ] )
		res.send(x)
	})

	router.get("/api/getrequests/:id", async (req, res) => { //GET FRIEND REQUESTS OF THE USER (ID'S)
	user.findOne({ _id: req.params.id }, async function(err, result) {
		if (err) {
			res.send(err);
		} else {
			if(result){
				var requestjson=[];
				for(let i of result.requests){
					if(i!=0){
						await user.findOne({ _id: i}, (err, result) =>{
							if(i!=0) requestjson.push(result);
						})
					}
				}
				res.send(requestjson);
			}
		}
		});
	})

	router.get("/api/getcitationrequests/:id", async (req, res) => { //GET ALL REQUESTS FOR A SPECIFIC USER
	declared_citations.find({ friend_id: req.params.id }, async function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
			}
		})
	})

	
	router.get("/api/account", async (req, res) => { //FIND IF ACCOUNT EXISTS
		const foundAccount = await account.findOne ({ "email" : req.query.email ,"password": req.query.password});
		if(foundAccount) res.send(foundAccount);
		else res.send("Invalid Email or Password, Try again");
	})

	router.post("/api/setactive", async (req, res) => { //FIND IF USER LOGGED IN
		// const foundAccount = await account.findOne ({ "user_id" : req.body.params.user_id});
		const foundAccount = await account.findOne ({ "user_id" : req.body.params.user_id});
		await account.findByIdAndUpdate(
			{ "_id": foundAccount._id }
		);
		if(res) res.send("ok");
		else res.send("Invalid Email or Password, Try again");
	})


	router.get("/api/friends/:id", async (req, res) => { //GET FRIENDS OF THE USER (ID'S)
	user.findOne({ _id: req.params.id }, async function(err, result) {
		if (err) {
			res.send(err);
		} else {
			if(result){
				var friendjson=[];
				for(let i of result.friends){
					if(i!=0){
						await user.findOne({ _id: i}, (err, result) =>{
							if(i!=0) friendjson.push(result);
						})
					}
				}
				res.send(friendjson);
			}
		}
		});
	})

	router.get("/api/topusers",async (req,res) =>{
		user.find({}, function(err, result) {
			if (err) {
			  res.send(err);
			} else {
			  res.send(result);
			}
		  })
		  .sort({ citation_points : -1 });
	})

	router.post("/api/verify",async (req, res) => { //FIND USER AND VERIFY PASSWORD
		user.findOne({ _id: req.body.params.user_id }, async function(err, result) {
			if (err) {
				res.send(err);
			} else {
				if(req.body.params.password!=result.password){
					res.send('Error');
				}
				else res.send('Ok');
			}
		});

	});

	router.post("/api/modify",async (req, res) => {  //FIND USER AND MODIFY
		await user.findByIdAndUpdate(
			{ "_id": req.body.params.user_id  },
			{ "fname": req.body.params.fname,"lname": req.body.params.lname,"email": req.body.params.email,"password": req.body.params.npassword,"img":req.body.params.img},
			function(err, result) {
			  if (err) {
				res.send(err);
			  } else {
				res.send(result);
			  }
			}
			);
		});


		router.post("/api/newpaper",async (req, res)=>{ //CREATE PAPER AND ADD IT TO USER DOCUMENT BY ID
		const paperd={
			user_id:req.body.params.id,
			title:req.body.params.title,
			citatedby:'0',
			declared_citations:'0',
			link:req.body.params.link,
			active:0,
			pending:1,
			citatedby:0,
			citation_points:0,
			publish_timer:Date.now(),
			venue:req.body.params.venue,
			authors:req.body.params.authors
		}

		
		await paper.create(paperd, function(err, result) {
				if (err) {
				res.send(err);
				} else {
					user.findByIdAndUpdate(paperd.user_id,{$push: {papers: result._id}},{useFindAndModify: false}, function(err, result){

						if(err){
							res.send(err)
						}
						else{
							res.send(result)
						}
				
					})
				}
			})
			
		});

		router.post("/api/citatepaper",async (req, res)=>{ //CITATE A PAPER
						
						await paper.findByIdAndUpdate(req.body.params.paper_id,{$push: {citatedby: req.body.params.user_id} ,$inc :{citation_points: 1}},{useFindAndModify: false})

						const paperr= await paper.findOne({ _id: req.body.params.paper_id })


						const declaredcitation={
							paper_from:req.body.params.papertodeclare,
							paper_to:req.body.params.paper_id,
							user_id:req.body.params.user_id,
							friend_id:req.body.params.friend_id.toString(),
							link:paperr.link,
							declared_date:Date.now(),
							confirmed_Date:'0',
							authors:req.body.params.authors
						}
				
						
						await declared_citations.create(declaredcitation, function(err, result) {
								if (err) {
								res.send(err);
								} else {
									res.send(result)
								}
						})							
		});

		router.post('/api/deletecitation', async (req, res) => {	//DELETE A SPECIFIC CITATION REQUEST
			archived_citations.findByIdAndDelete(req.body.params.request_id, async (error, data) => {
				if (error) {
					console.log('error in deleting!');
					throw error;
				} else {
					res.send(data);
				}
			});
		});

		router.post('/api/deleterequestcitation', async (req, res) => {	//DELETE A SPECIFIC CITATION REQUEST
			declared_citations.findByIdAndDelete(req.body.params.request_id, async (error, result) => {
				if (error) {
					console.log('error in deleting!');
					throw error;
				} else {
					res.send(result)
				}
			});

		});

		router.post('/api/deletearchivedrequestcitation', async (req, res) => {	//DELETE A SPECIFIC CITATION REQUEST

			archived_citations.findByIdAndDelete(req.body.params.request_id, async (error, result) => {
				if (error) {
					throw error;
				} else {
					res.send(result)
				}
			});
		});


		router.post("/api/declarecitation",async (req, res)=>{ //CITATE A PAPER

			let papertmp = await paper.findOne({ _id: req.body.params.paperto}, async function(err, result) {
				if (err) {
				res.send(err);
				} else {
				}
			});
			await paper.findByIdAndUpdate({_id: req.body.params.paperfrom},{$push: {declared_citations: papertmp.title}},{useFindAndModify: false}, function(err, result){
				if(err){
					res.send(err)
				}
				else{
					res.send(result)
				}
			})
		});

		router.post("/api/citationarchive",async (req, res)=>{ //CITATE A PAPER

			let requesttmp = await declared_citations.findOne({ _id: req.body.params.request_id }, async function(err, result) {
				if (err) {
				res.send(err);
				} else {
				}
			});

			await declared_citations.findByIdAndDelete(req.body.params.request_id, async (error, data) => {
				if (error) {
					console.log('error in deleting!');
					throw error;
				} else {
					console.log("citation deleted")
				}
			});
			const archived={
				paper_from:requesttmp.paper_from,
				paper_to:requesttmp.paper_to,
				user_id:requesttmp.user_id,
				friend_id:requesttmp.friend_id.toString(),
				link:requesttmp.link,
				declared_date:requesttmp.declared_date,
				authors:requesttmp.authors,
				confirmed_Date:'0'
			}
	
			
			await archived_citations.create(archived, function(err, result) {
					if (err) {
					res.send(err);
					} else {
						console.log("arch citation created")
						res.send(result)
					}
			})				


		});

		router.get("/api/getarchivedcitationrequests/:id", async (req, res) => { //GET ALL REQUESTS FOR A SPECIFIC USER
			archived_citations.find({ friend_id: req.params.id }, async function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.send(result);
					}
				})
		})	
		

		router.post('/api/increasecitation', async (req, res) => {	//INCREASE CITATION POINTS OF USER
			await user.findByIdAndUpdate(
				{ "_id": req.body.params.user_id  },
				{ $inc: { citation_points: 3 } });
			})

		router.post('/api/penalty', async (req, res) => {	//PENALTY IF USER REJECTS THE CITATION REQUEST
			await user.findByIdAndUpdate(
				{ "_id": req.body.params.user_id  },
				{ $inc: { citation_points: -6 } });
				

						await paper.findByIdAndUpdate({ "_id": req.body.params.paper_to  },
							{ $pull: { citatedby: { $in: [req.body.params.user_id] } }},{ $inc: { citation_points: -1 } })
							
							 
								await paper.findByIdAndUpdate({ "_id":req.body.params.paper_from },{ $pull: { declared_citations: { $in: [req.body.params.friend_id] } }},
									async function(err, result) {
										if (err) {
											console.log("penalty declaredcitations remove failed")
										} else {
											res.send(result)
										}
									});
					}
		);

		router.get("/api/paper/:id", async (req, res) => { //GET SPECIFIC PAPER IN THE DATABASE
			paper.findOne({ _id: req.params.id }, function(err, result) {
				if (err) {
				res.send(err);
				} else {
				res.send(result);
				}
			});
		})

		router.get("/api/getpapers/:id", async (req, res) => { //GET PAPERS OF THE USER (ID'S)
			user.findOne({ _id: req.params.id }, async function(err, result) {
			if (err) {
				res.send(err);
			} else {
				if(result){
					var papersjson=[];
					for(let i of result.papers){
						if(i!=0){
							await paper.findOne({ _id: i}, (err, result) =>{
								if(i!=0) papersjson.push(result);
							})
						}
					}
					res.send(papersjson);
				}
			}
			});
		})

		router.get("/api/getactivepapers/:id", async (req, res) => { //GET PAPERS OF THE USER (ID'S) WHICH ARE ACTIVE
			user.findOne({ _id: req.params.id }, async function(err, result) {
			if (err) {
				res.send(err);
			} else {
				if(result){
					var papersjson=[];
					for(let i of result.papers){
						if(i!=0){
							await paper.findOne({ _id: i, active: 1}, (err, result) =>{
								if(i!=0 && result) papersjson.push(result);
							})
						}
					}
					res.send(papersjson);
				}
			}
			});
		})

		router.get("/api/getpendingpapers/:id", async (req, res) => { //GET PAPERS OF THE USER (ID'S) WHICH ARE PENDING
			user.findOne({ _id: req.params.id }, async function(err, result) {
			if (err) {
				res.send(err);
			} else {
				if(result){
					var papersjson=[];
					for(let i of result.papers){
						if(i!=0){
							await paper.findOne({ _id: i, pending: 1}, (err, result) =>{
								if(i!=0 && result) papersjson.push(result);
							})
						}
					}
					res.send(papersjson);
				}
			}
			});
		})

		router.post('/api/deletepaper', async (req, res) => {	//DELETE A SPECIFIC PAPER


			paper.findByIdAndDelete(req.body.params.paper_id, async (error, data) => {
				if (error) {
					console.log('error in deleting!');
					throw error;
				} else {
				console.log('PaperDeleted!');
				}
			});

			await user.findByIdAndUpdate(
				{ "_id": req.body.params.user_id  },
				{ $pull: { papers: { $in: [req.body.params.paper_id,] } }},
				async function(err, result) {
					if (err) {
						res.send(err);
					} else {
									res.send("OK");
							}
						res.send("OK");	
			});

		})

		router.post('/api/deletefriendship', async (req, res) => {	//DELETE A FRIENDSHIP
		
			await user.findByIdAndUpdate(
				{ "_id": req.body.params.user_id  },
				{ $pull: { friends: { $in: [req.body.params.friend_id] } }},
				async function(err, result) {
					if (err) {
						res.send(err);
					} else {
						await user.findByIdAndUpdate(
							{ "_id": req.body.params.friend_id  },
							{ $pull: { friends: { $in: [req.body.params.user_id] } }},
							async function(err, res) {
								if (err) {
									res.send(err);
								} else {
									res.send("OK");
								}
							}
						);
						res.send("OK");
					}
				}
		);

	});

	router.post("/api/publishpaper",async (req, res) => {  //DECREASE PAPER LIKES
		await user.findByIdAndUpdate(
			{ "_id": req.body.params.user_id },
			{ $inc: { citation_points: -3 } })

			  if(!res) {
				res.send("Not enough points");
			  } else {
				await paper.findByIdAndUpdate(
					{ "_id": req.body.params.paper_id },
					{ $set:{active:1,pending:0} }
					);
					res.send("Paper Ok");
			  }
	});



	router.post("/api/orcid",async (requ, res) => {  //DECREASE PAPER LIKE

			const data = JSON.stringify({
				client_id:"APP-EFMNXKB2CXQO2CNR",
				client_secret:"2d1cc39d-2148-4e84-bf91-18e752737960",
				grant_type:"authorization_code",
				code:"e6ruQi",
				redirect_uri:"https://api.sandbox.orcid.org/"
			  })
			  
			  const options = {
				hostname: 'sandbox.orcid.org',
				path: '/oauth/token',
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'				}
			  }
			  
			  const req = https.request(options, res => {
				console.log(`statusCode: ${res.statusCode}`)
			  
				res.on('data', d => {
				  process.stdout.write(d)
				})
			  })
			  
			  req.on('error', error => {
				console.error(error)
			  })
			  
			  req.write(data)
			  req.end()
			  
	});

	router.post("/api/paperresult/:query/:id",async (req, res) => {  //PAPER SEARCH RESULT
		let query=req.params.query;
		let id=req.params.id;
		let papers = await paper.find({"title" : new RegExp(query,'i'),"active" : 1,"user_id": {$ne: id} }).sort({ citation_points : -1 });
		res.send(papers);
		
	});

	router.post("/api/peopleresult/:query/:id",async (req, res) => { //PEOPLE SEARCH RESULT
		let query=req.params.query;
		let id=req.params.id;
		// let users1 = await user.find({ "fname":new RegExp(query,'i'),"_id": {$ne: id} });
		// let users2 = await user.find({ "lname":new RegExp(query,'i'),"_id": {$ne: id} });
		let users3 = await user.find({ $or: [ { fname: new RegExp(query,'i') }, { lname: new RegExp(query,'i') } ],"_id": {$ne: id} });

		// users1 = users1.concat(users2);

		res.send(users3);
		
	});

	router.post("/api/isfriends/:u1/:u2",async (req, res) => {  //FIND IF 2 IDS ARE FRIENDS
		let id1=req.params.u1;
		let id2=req.params.u2;
		let user = await user.findOne({'_id' : id1});

		let data= user.friends;
		console.log("data:"+data)

		
	});
