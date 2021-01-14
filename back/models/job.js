const mongoose = require('mongoose');
const getCurrentDate = require('../lib/getCurrentDate');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  writer: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: getCurrentDate(),
  },
  updaterDate: {
    type: Date,
    default: null,
  },
});

const JobSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  userToken: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: getCurrentDate(),
  },
  updateDate: {
    type: Date,
    default: null,
  },
  imgPath: {
    type: String,
  },
  companyName: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: Number,
    required: true,
  },
  introduce: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  preferentialTreatment: {
    type: String,
    required: true,
  },
  skills: [String],
  welfare: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    required: true,
  },
  other: {
    type: String,
  },
  cntLike: {
    type: Number,
    default: 0,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
  comments: { type: [CommentSchema], default: [] },
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;

/*
{
    "userEmail": "gmyong21@gmail.com",
    "imgPath": "hello.jpg",
    "companyName": "NAVER",
    "exprerienceLevel": 0,
    "introduce": "네이버입니다.",
    "task": "웹 사이트를 유지보수합니다.",
    "condition": "리액트를 다뤘봤어야 됩니다.",
    "preferentialTreatment": "웹팩 해봤으면 좋아요",
    "skills": ["react", "vue"],
    "welfare": "맥북 줘요",
    "deadline": "2021-01-31",
    "address1": "경기도 고양시 일산동구 사리현동",
    "address2": "동문아파트 201동",
    "source": "www.naver.com",
    "other": ""
  }
*/
