const getCurrentDate = require('../../lib/getCurrentDate');
const getNextSequence = require('../../lib/getNextSequence');
const Job = require('../../models/job');
const User = require('../../models/user');

// 공고 리스트 응답
exports.list = async (req, res) => {
  try {
    const { rollingCnt } = req.query;

    const jobsCnt = await Job.find({ deletedDate: null }).countDocuments();
    const jobs = await Job.find({ deletedDate: null })
      .skip(9 * rollingCnt)
      .sort({ _id: -1 })
      .limit(9);

    res.send({ message: 'list success', jobs, jobsCnt });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 공고 검색
exports.search = async (req, res) => {
  const { companyName } = req.params;
  const { rollingCnt } = req.query;

  try {
    const jobsCnt = await Job.find({ deletedDate: null, companyName: { $regex: companyName, $options: 'i' } }).countDocuments();
    const jobs = await Job.find({ deletedDate: null, companyName: { $regex: companyName, $options: 'i' } })
      .skip(9 * rollingCnt)
      .sort({ _id: -1 })
      .limit(9);

    res.send({ message: 'list success', jobs, jobsCnt });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// tags 조회
exports.getTags = async (req, res) => {
  try {
    let tags = [];
    const jobs = await Job.find({ deletedDate: null });

    jobs.forEach(job => {
      tags = [...tags, ...job.skills];
    });

    tags = [...new Set(tags)];

    res.send({ message: 'list success', tags });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'list fail', error: e });
  }
};

// tag에 따른 job list 조회
exports.listByTags = async (req, res) => {
  try {
    const { tagString } = req.params;
    const { rollingCnt } = req.query;

    const jobsCnt = await Job.find({ deletedDate: null, skills: { $in: tagString.split(' ') } }).countDocuments();
    const jobs = await Job.find({ deletedDate: null, skills: { $in: tagString.split(' ') } })
      .skip(9 * rollingCnt)
      .sort({ _id: -1 })
      .limit(9);

    res.send({ message: 'list success', jobs, jobsCnt });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 특정 공고 응답
exports.find = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send();

  try {
    const job = await Job.findOne({ id: +id, deletedDate: null });

    if (!job) return res.status(404).send();

    res.send({ message: 'find success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 공고 등록
exports.write = async (req, res) => {
  const {
    userToken,
    imgPath,
    companyName,
    experienceLevel,
    introduce,
    task,
    condition,
    preferentialTreatment,
    skills,
    welfare,
    deadline,
    address1,
    address2,
    source,
    other,
  } = req.body;

  if (
    !userToken ||
    !companyName ||
    !experienceLevel ||
    !introduce ||
    !task ||
    !condition ||
    !preferentialTreatment ||
    !skills ||
    !welfare ||
    !deadline ||
    !address1 ||
    !source
  )
    return res.status(404).send();

  try {
    const id = await getNextSequence('jobId');

    const job = await Job.create({
      id,
      userToken,
      imgPath,
      companyName,
      experienceLevel,
      introduce,
      task,
      condition,
      preferentialTreatment,
      skills,
      welfare,
      deadline,
      address1,
      address2,
      source,
      other,
    });

    res.send({ message: 'write success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 공고 수정
exports.replace = async (req, res) => {
  const {
    imgPath,
    companyName,
    exprerienceLevel,
    introduce,
    task,
    condition,
    preferentialTreatment,
    skills,
    welfare,
    deadline,
    address1,
    address2,
    source,
    other,
  } = req.body;

  if (
    !imgPath ||
    !companyName ||
    !exprerienceLevel ||
    !introduce ||
    !task ||
    !condition ||
    !preferentialTreatment ||
    !skills ||
    !welfare ||
    !deadline ||
    !address1 ||
    !address2 ||
    !source
  )
    return res.status(404).send();

  const { id } = req.params;

  try {
    const job = await Job.findOneAndUpdate(
      { id },
      {
        imgPath,
        companyName,
        exprerienceLevel,
        introduce,
        task,
        condition,
        preferentialTreatment,
        skills,
        welfare,
        deadline,
        address1,
        address2,
        source,
        other,
        updateDate: getCurrentDate(),
      },
      { new: true }
    );

    if (!job) return res.status(404).send();

    res.send({ message: 'replace success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 공고 삭제
exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send();

  try {
    const job = await Job.findOneAndUpdate(
      { id },
      {
        deletedDate: getCurrentDate(),
      },
      { new: true }
    );

    if (!job) return res.status(404).send();

    res.send({ message: 'delete success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 관심 숫자 증가
exports.like = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) return res.status(404).send();

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $inc: { cntLike: 1 } }, { new: true });

    if (!job) return res.status(404).send();

    res.send({ message: 'like success', num: job.cntLike });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 관심 숫자 감소
exports.unlike = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) return res.status(404).send();

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $inc: { cntLike: -1 } }, { new: true });

    if (!job) return res.status(404).send();

    if (job.cntLike < 0) {
      return res.status(404).send();
    }

    res.send({ message: 'unlike success', num: job.cntLike });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 댓글 등록
exports.addComment = async (req, res) => {
  const { id, jobId, comment } = req.body;

  if (!id || !jobId || !comment) return res.status(404).send();

  const { email } = await User.findOne({ id });

  if (!email) return res.status(404).send();

  const userId = email.split('@')[0];
  let userBlockIdBlock = '';

  for (let i = 0; i < userId.length; i++) {
    userBlockIdBlock += i > 3 ? '*' : userId[i];
  }

  const newComment = {
    writer: id,
    userId: userBlockIdBlock,
    comment,
  };

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $push: { comments: newComment } }, { new: true });

    if (!job) return res.status(404).send();

    res.send({ message: 'add success', comments: job.comments });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 댓글 수정
exports.replaceComment = async (req, res) => {
  const { jobId, commentId, newComment } = req.body;

  if (!jobId || !commentId || !newComment) return res.status(404).send();

  try {
    const job = await Job.findOne({ id: jobId });

    if (!job) return res.status(404).send();

    const comment = job.comments.find(({ _id }) => _id.toString() === commentId);

    if (!comment) return res.status(404).send();

    comment.comment = newComment;
    comment.updaterDate = getCurrentDate();

    job.save();

    res.send({ message: 'replace success', comments: job.comments });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

// 이미지 업로드
exports.upload = async (req, res) => {
  res.json({ url: `${req.file.filename}` });
};
