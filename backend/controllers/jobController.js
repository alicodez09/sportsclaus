import ticketModel from "../models/ticketModel.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {

    const job = await ticketModel.create(req.body);

    res.status(201).send({
      success: true,
      message: "New FAQ created",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating FAQ",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    const { slug } = req.params;
    const updatedFaq = await ticketModel.findOneAndUpdate(
      { slug }, // Using the slug to find the FAQ
      { question, answer, category, slug: slugify(question) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "FAQ updated successfully",
      updatedFaq,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating FAQ",
    });
  }
};

// export const updateFaqController = async (req, res) => {
//   try {
//     const { question, answer, category } = req.body;
//     const { slug } = req.params;
//     const updatedFaq = await ticketModel.findOneAndUpdate(
//       { slug },
//       { question, answer, category, slug: slugify(question) },
//       { new: true }
//     );A
//     res.status(200).send({
//       success: true,
//       message: "FAQ updated successfully",
//       updatedFaq,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while updating FAQ",
//     });
//   }
// };

export const get = async (req, res) => {
  try {
    const jobs = await ticketModel.find({});
    res.status(200).send({
      success: true,
      message: "All FAQs retrieved successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while retrieving FAQs",
    });
  }
};
export const getTickets = async (req, res) => {
  const result = await ticketModel.find({}).populate("user_id").exec();
  res.status(200).send({
    success: true,
    message: "All tickets retrieved successfully",
    result,
  });

};
export const updateeTickets = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status)
    // Validate status
    const validStatuses = ['open', 'in-progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      console.log({
        success: false,
        message: 'Invalid status value'
      })
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const ticket = await ticketModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.json({
      success: true,
      result: ticket
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update ticket',
      error: err.message
    });
  }

};
export const singleFaqController = async (req, res) => {
  try {
    const faq = await ticketModel.findOne({ slug: req.params.slug });
    if (!faq) {
      return res.status(404).send({
        success: false,
        message: "FAQ not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single FAQ retrieved successfully",
      faq,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while retrieving FAQ",
    });
  }
};

export const deletejob = async (req, res) => {
  try {
    const { id } = req.params;
    await ticketModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting FAQ",
      error,
    });
  }
};
