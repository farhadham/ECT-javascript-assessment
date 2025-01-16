### A

**Which developer spent time on a project that was actually already finished and for which
customer was it?**

```sql
SELECT DISTINCT d.NAME AS Developer_Name, c.NAME AS Customer_Name
FROM Developer d
JOIN Developer_Task dt ON d.ID = dt.DEV_ID
JOIN Task t ON dt.TASK_ID = t.ID
JOIN Project p ON t.PROJECT_ID = p.ID
JOIN Customer c ON p.CUSTOMER_ID = c.ID
WHERE p.END_DATE IS NOT NULL
AND t.START_DATE > p.END_DATE;
```

Description:
This query finds developers who worked on tasks after the project they belonged to was already finished. It connects the relevant tables (`Developer`, `Developer_Task`, `Task`, `Project`, and `Customer`) to get all necessary information. We focus only on projects that have an `END_DATE` (meaning they are completed) and tasks where the `START_DATE` is after the project’s `END_DATE`.
Finally, it outputs the developer’s name and the customer associated with the project, making sure each developer-customer pair appears only once using `DISTINCT`.

---

### B

**How many support tasks did each developer work on last year for Proof of Concept
projects?**

```sql
SELECT d.name AS Developer_Name, COUNT(t.ID) as Support_Task_Count
FROM Developer d
JOIN Developer_Task dt ON d.ID = dt.DEV_ID
JOIN Task t ON dt.TASK_ID = t.ID
JOIN Project p ON t.PROJECT_ID = p.id
WHERE t.TYPE = 1
AND p.TYPE = 2
AND EXTRACT(YEAR FROM t.START_DATE) = EXTRACT(YEAR FROM SYSDATE) - 1
GROUP BY d.NAME;
```

Description:
This query calculates how many support tasks each developer worked on during the previous year for "Proof of Concept" projects. It connects the relevant tables (`Developer`, `Developer_Task`, `Task`, and `Project`) to gather the necessary data. The query filters for tasks that are of type "Support" (t.TYPE = 1) and belong to "Proof of Concept" projects (p.TYPE = 2). Additionally, it makes sure that only tasks that started in the previous year are included (EXTRACT(YEAR FROM t.START_DATE) = EXTRACT(YEAR FROM SYSDATE) - 1). Finally, it groups the results by developer name and counts the number of support tasks each developer worked on during that time.

---

### C

**How many support tasks did each developer work on last year for Proof of Concept
projects?**

```sql
SELECT d.NAME AS Developer_Name
FROM Developer d
LEFT JOIN Developer_Task dt ON d.ID = dt.DEV_ID
LEFT JOIN Task t ON dt.TASK_ID = t.ID
LEFT JOIN Project p ON t.PROJECT_ID = p.ID AND p.TYPE = 0
WHERE p.TYPE != 0
GROUP BY d.NAME
HAVING COUNT(p.ID) = 0;
```

Description:
This query identifies developers who have not participated in any Scrum project. It uses a `LEFT JOIN` to connect the `Developer`, `Developer_Task`, `Task`, and `Project` tables. The query filters for developers who have not been involved in tasks related to Scrum projects (i.e., `p.TYPE != 0` for non-Scrum projects). The `HAVING COUNT(p.ID) = 0` condition ensures that only developers who have not participated in any Scrum project are returned. The result is a list of developers who have not worked on any Scrum project yet.
