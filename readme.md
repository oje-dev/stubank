#Requirements: python 3.8, NodeJS #
Running Stubank:
(we use ports 5000,500)
1. run "pip install -r requirements.txt" in this folder
2. run "npm i" in this folder (make sure dev dependencies get installed)
3. run "npm i" in ./frontend
4. run the following commands, each in their own terminal:
   "python machinelearning/fraud/fraudserver.py"
   "python machinelearning/predict/predictserver.py"
5. Run the nodeJS server using "npm run dev"

#Notes: #
*  all documents are in the docs folder.

* It is reccomended you make 2 accounts so you can transfer money between them.

* To simulate a "deposit" Into your account, please run "node cli.js" and follow the prompts.

