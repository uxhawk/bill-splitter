<h1>Bill Splitter</h1>
<p>Open <a href="https://uxhawk.github.io/bill-splitter/">Bill Splitter</a></p>
<img src="https://lh3.googleusercontent.com/ZNIhgVtP8h_4uU5qxy-ZMUDDmdN-ssxlysWQngPDsRgJC_IH1xrU8Am5W3w7Qr0M0fEPtRYM468T9zGLQiHKwUzpjCtjZUobslBMjgnZIRs67eKAn-_bTVjMMeh0lwiht37TOwr4QoJ36_oi_KtS7i_ZUG2hFWRb1ku1usduxJ6oCd9cbIt4v1srotsRj6jj4TsgpAZf1KjUcioVMcA61zJHJG36UxF76zJ1OivlCYG1PPAxdTNreatReGcKE_eSegzggh8fPzcmwgcYjLm6T1gaZ4sG3ncVqIcmOCSZ0st5sU1nUy2g6Kzs1ehRpriwNMmA7--ahPF-kfTiwsz21TxZa-ob-uyT6n4bHGxb1XNTiLiesy8WzuyoFM9sB41JpZgMM0KbeG1v9g-C-SDOb0wzvsR3L5rg4Se31hugR7wEmUyvBn1icqEubCkExpqiIRmKpF-5144FF7foNg1wg8vKRi77fJQZPAUkvBfP8PxD4fUIcNMG7vKVbJrutWk1PFuY5cyEMA-nm5d5Txe8MjUeC0urrBlZYRfI_No2stUr6LH0pH0UkEXcNSg48q638Xn7-jlwn14FkpYciSAj-lmuMM9ws69oEls_VzIPWQh7Wvu51HQw1rEetLCf1caMfUtLqisfTk3Mji9Mm3NR5o-gSYLODj45RBW7ikApn06UgpoRrIN8Muq6ZxjDS4r2iJbQGPkTkX3BhDR1qf-c4QG9FEra5eREzdIWAXDh6i-Zso3SKPN87PQ=w1140-h524-no" alt="breakdown of bill payments">

<h2>How to Use</h2>
<p>This app helps people split costs for things like a night out or a weekend trip. For example, on a weekend trip, person A spends $300 on group lodging, person B spends $120 on groceries, and person C buys $80 worth or alcohol. The question at the end of the trip is, how much does everyone owe one another? This app will answer that question.</p>

<h2>The Code</h2>
<p><a href="https://getbootstrap.com/">Bootstrap CSS</a> is used to style UI components. <a href="https://jquery.com/">jQuery</a> is used to target and manipulate the DOM.</p>

<p>To settle debts evenly, a total expenditures variable holds a running tally of all expenses. Total expenditures are divided by the number of people in the group. The amount they've contributed (divided by the number of people in the group) is subtracted from the total expenditures and displayed in the DOM within that person's expense card.</p>
