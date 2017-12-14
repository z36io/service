# sns.z36.io

## Statuses: code - text - description

+ -1 - transform - Internal transform status 
+  0 - created/new - Created (Default status)
+  1 - invoiced - Invoice was sent
+  2 - paid - Invoice was paid
+  3 - order - Funds order was created
+  4 - sent - Funds were sent
+  9 - close - Closed
+  5xx - error - Errors
++  501 - error - Error: Not enough money
++  Previous code prev: 3

## Topic rooms: <name_of_table>-<status_text>

+ transformations-created
+ transformations-paid
+ transformations-sent
+ transformations-error
