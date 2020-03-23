<h1>Bill Splitter</h1>
<p>Open <a href="https://uxhawk.github.io/splitter/">Bill Splitter</a></p>
<img src="https://lh3.googleusercontent.com/nYwola8K8YOo_rEUGELPppZ0-vtBE4UyO8F6AdyD0MI4WFvpOCDn54kfy7uLN5jbhHotisF7FD9cB6G0vJJGmxW3Ux4k2-pRCuso52Ofzs1uD-sh0JgxI4Ea6g9Gd8jwfalpPcatyAk-qiEGbHi69Jztkpn3IQRZWUZg4H6Lyrka1j4uAG3PLa5qv0WBp5To7aEQ3Fgj2PtYF_TQn7hjFeF5Dgi5A--K6paFOuvj74YteeEuIzw8BIS8w3YkZSgF6OOGm2phFdQoM8VM3OUQsjc1JM2rQ9O3lmospZ5PDi_fYCT6sYRzcrdvUaORbPo1RUqHtMANErZ1XMDSm8v_Ap_oMZ4QRPVgel-IK61rBNOo3Ghp5PLWhgFyvXksXND1w0ahlhLl9twqxWVgFXuE6cSRgIZSad4saYCz5SzSz8RXAsz7JSZo1THio3xGasRCgZX6WtgbeC-Vwkj30nxDDLaZbDJxJ8AXZ9vm6g4hcll6TIBYTCHI2CLoajTq2plsSV1N68qYTpgftEiLpi-Wbgkb3TQRgJFO8eG5XtCfbSisoAyINZXP6sanp78tOna1BU42G0wv8u4BodhIqyXS1ye1Ytc7Ln90XP8zhLoRdgwn80PatOkfghRYPwfVyAZstXA4f_4_kNAyiEE-5VfeA7P5Y8861t6FQaW0EGNKSOp7dPokp_ou795wg8604Q=w1140-h524-no" alt="breakdown of bill payments">

<h2>How to Use</h2>
<p>This app helps people split costs for things like a night out or a weekend trip. For example, on a weekend trip, person A spends $300 on group lodging, person B spends $120 on groceries, and person C buys $80 worth or alcohol. The question at the end of the trip is, how much does everyone owe one another? This app will answer that question.</p>

<h2>The Code</h2>
<p><a href="https://getbootstrap.com/">Bootstrap CSS</a> is used to style UI components. <a href="https://jquery.com/">jQuery</a> is used to target and manipulate the DOM.</p>

<p>To settle debts evenly, a total expenditures variable holds a running tally of all expenses. Total expenditures are divided by the number of people in the group. The amount they've contributed (divided by the number of people in the group) is subtracted from the total expenditures and displayed in the DOM within that person's expense card.</p>
