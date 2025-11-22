import Qualification from '../models/qualification.js';

export const getAll = async (req, res) => {
  const items = await Qualification.find();
  res.json(items);
};

export const getById = async (req, res) => {
  const item = await Qualification.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const createOne = async (req, res) => {
  const item = new Qualification(req.body);
  await item.save();
  res.status(201).json(item);
};

export const updateById = async (req, res) => {
  const item = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const removeById = async (req, res) => {
  const item = await Qualification.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

export const removeAll = async (req, res) => {
  await Qualification.deleteMany({});
  res.json({ message: 'All deleted' });
};
