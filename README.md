<div align="center">
<img src="https://raw.githubusercontent.com/LegionnaireDevs/legionnaire/main/hackathon%20legionnare.png?raw=true" alt="Legionnaire Logo" width="50%">



<h1>Legionnaire</h1> 
<p>
Legionnaire is an AI-powered SIEM (Security Information and Event Management) platform designed for comprehensive, automated threat detection and response. It operates as a modular, GUI-less system running in the background, consisting of a client and a control server.
</p>


<h3> Built for the UQCS Hackathon 2025. </h3>
</div>

## Features

#### XGBoost Binary Classification
The model being used is the XGBClassification algorithm, which is an extremely optimised gradient boosting ensemble algorithm. This model was trained and tested on real collected data and verified using the CIC-IDS-2017 dataset. Throughout the hackathon, the model was trained a variety of times, attempting multiclass classification and binary classification of attacks. The final model used is a logistic binary classifier trained with L1 and L2 regularisation, also implementing methods to deal with class imbalances such as weight scaling. This classifier predicts the labels of data containing 79 columns of network traffic to either Benign (0) or Attack (1).

#### Network Module
Captures network traffic and performs feature analysis using machine learning to identify suspicious network activity.

#### Log Module
Monitors and analyzes system logs on Windows, Linux, and Mac to detect anomalous or potentially harmful events.

#### Program Analysis
Hashes all running executables on the device and compares them against external threat databases to detect malicious programs in real time.

#### Action Module
Acts as a defense and response system, capable of blocking network attacks via a firewall and terminating or removing malicious files on command.



## Authors

- [@Sean](https://github.com/seanhramsey)
- [@Thomas](https://github.com/TomMcPh)
- [@Samuel](https://github.com/smp46)
- [@Liam](https://github.com/Meemum)
- [@Lachlan](https://github.com/Lachlanoc)
- [@Brandon](https://github.com/Bangu7)



## Badges

[![Github All Releases](https://img.shields.io/github/downloads/LegionnaireDevs/legionnaire/total.svg)]()

[![Github All Releases](https://img.shields.io/badge/version%201.1-345eeb)]()


## Demo

Insert gif or link to demo


## API Reference

#### Malware Bazaar
https://bazaar.abuse.ch/browse/




## Appendix


#### SysLog Rules

https://github.com/ossec/ossec-hids/blob/f6502012b7380208db81f82311ad4a1994d39905/etc/rules/syslog_rules.xml

#### ChatGPT

https://chatgpt.com/


