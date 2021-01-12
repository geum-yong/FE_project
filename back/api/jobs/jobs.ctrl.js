const getCurrentDate = require('../../lib/getCurrentDate');
const getNextSequence = require('../../lib/getNextSequence');
const Job = require('../../models/job');

// 공고 리스트 응답
exports.list = async (req, res) => {
  try {
    const jobs = await Job.find({ deletedDate: null });

    res.send({ message: 'list success', jobs });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'list fail', error: e });
  }
};

// 공고 검색
exports.search = async (req, res) => {
  const { companyName } = req.params;

  try {
    const jobs = await Job.find({ deletedDate: null, companyName: { $regex: companyName, $options: 'i' } });

    res.send({ message: 'list success', jobs });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'list fail', error: e });
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

    const jobs = await Job.find({ deletedDate: null, skills: { $in: tagString.split(' ') } });

    res.send({ message: 'list success', jobs });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'list fail', error: e });
  }
};

// 특정 공고 응답
exports.find = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send({ message: 'find fail', error: 'null of params' });

  try {
    const job = await Job.findOne({ id });

    if (!job) return res.status(404).send({ message: 'find fail', error: 'null of job' });

    res.send({ message: 'find success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'find fail', error: e });
  }
};

// 공고 등록
exports.write = async (req, res) => {
  const {
    userToken,
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
    !userToken ||
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
    return res.status(404).send({ message: 'write fail', error: 'null of request' });

  try {
    const id = await getNextSequence('jobId');

    const job = await Job.create({
      id,
      userToken,
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
    });

    await res.send({ message: 'write success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'write fail', error: e });
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
    return res.status(404).send({ message: 'replace fail', error: 'null of request' });

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

    if (!job) return res.status(404).send({ message: 'replace fail', error: 'null of job' });

    res.send({ message: 'replace success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'replace fail', error: e });
  }
};

// 공고 삭제
exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send({ message: 'delete fail', error: 'null of params' });

  try {
    const job = await Job.findOneAndUpdate(
      { id },
      {
        deletedDate: getCurrentDate(),
      },
      { new: true }
    );

    if (!job) return res.status(404).send({ message: 'delete fail', error: 'null of job' });

    res.send({ message: 'delete success', job });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'delete fail', error: e });
  }
};

// 관심 숫자 증가
exports.like = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) return res.status(404).send({ message: 'like fail', error: 'null of request' });

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $inc: { cntLike: 1 } }, { new: true });

    if (!job) return res.status(404).send({ message: 'like fail', error: 'null of job' });

    res.send({ message: 'like success', num: job.cntLike });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'like fail', error: e });
  }
};

// 관심 숫자 감소
exports.unlike = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) return res.status(404).send({ message: 'unlike fail', error: 'null of request' });

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $inc: { cntLike: -1 } }, { new: true });

    if (!job) return res.status(404).send({ message: 'unlike fail', error: 'null of job' });
    if (job.cntLike < 0) {
      job.cntLike = 0;
      job.save();
      return res.status(404).send({ message: 'unlike fail', error: 'less 0 of request' });
    }

    res.send({ message: 'unlike success', num: job.cntLike });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'like fail', error: e });
  }
};

// 댓글 등록
exports.addComment = async (req, res) => {
  const { userEmail, jobId, comment } = req.body;

  if (!userEmail || !jobId || !comment) return res.status(404).send({ message: 'add fail', error: 'null of request' });

  const newComment = {
    writer: userEmail,
    comment,
  };

  try {
    const job = await Job.findOneAndUpdate({ id: jobId }, { $push: { comments: newComment } }, { new: true });

    if (!job) return res.status(404).send({ message: 'add fail', error: 'null of job' });

    res.send({ message: 'add success', comment: newComment });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'add fail', error: e });
  }
};

// 댓글 등록
exports.replaceComment = async (req, res) => {
  const { jobId, commentId, newComment } = req.body;

  if (!jobId || !commentId || !newComment) return res.status(404).send({ message: 'replace fail', error: 'null of request' });

  try {
    const job = await Job.findOne({ id: jobId });

    if (!job) return res.status(404).send({ message: 'replace fail', error: 'null of job' });

    const comment = job.comments.find(({ _id }) => _id.toString() === commentId);

    if (!comment) return res.status(404).send({ message: 'replace fail', error: 'null of comment' });

    comment.comment = newComment;
    comment.updaterDate = getCurrentDate();

    job.save();

    res.send({ message: 'replace success', comment });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'replace fail', error: e });
  }
};
