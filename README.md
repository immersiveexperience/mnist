# The Power of Deep Learning in the Browser

This tool is a browser-based application that uses [TensorFlow.js](https://js.tensorflow.org/) to predict handwritten numbers. It employs the MNIST dataset for training and validation purposes. The model can be trained over multiple epochs for improved accuracy.

## Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/immersiveexperience/mnist
cd mnist
npm install
```

## Usage

Run the application.

```bash
nx serve mnist
```

Open the application in your browser.

```bash
http://localhost:4200/
```

### Training

Click on the "Train" button at the top left to access the training page. The model can be trained over multiple epochs. Depending on your hardware and browser, training can take a few minutes. It is advised to start with lower epoch values (1-3) and increase them gradually.
Click the "Load Data and Train Model" button to start training.
To stop the training process, refresh or close the page.

During training, the **Training Progress** section displays the model's current accuracy and loss.

The **Inference Examples** provide a live display of the model's predictions. Green indicates a correct prediction, while red signifies incorrect ones.

The model's training progress can be found in the **Status** section located at the bottom right of the page. Once training completes, a pop-up will prompt you to download the model.json and model.weights.bin files. Ensure you save both files to the **apps/mnist/src/assets/models** directory.

### Prediction

Upon completing the training, click the "Predict" button at the top left to navigate to the prediction page. The model will load automatically. Draw a number on the canvas, and the model will predict its value.

To reset the canvas, simply click the "Clear" button.
