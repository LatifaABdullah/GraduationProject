// جلب بيانات المرشحين من الخادم
fetch('/candidates')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('candidates-table').getElementsByTagName('tbody')[0];

        // إضافة الصفوف إلى الجدول
        data.forEach(candidate => {
            const row = table.insertRow();
            const nameCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const skillsCell = row.insertCell(2); // عمود المهارات
            const experienceCell = row.insertCell(3); // عمود سنوات الخبرة
            const phoneCell = row.insertCell(4); // عمود رقم الجوال

            nameCell.textContent = candidate.name;
            emailCell.textContent = candidate.email;
            skillsCell.textContent = candidate.skills; // عرض المهارات
            experienceCell.textContent = candidate.experience; // عرض سنوات الخبرة
            phoneCell.textContent = candidate.phone; // عرض رقم الجوال
        });
    })
    .catch(error => console.error('Error fetching candidates:', error));

// جلب بيانات الوظائف من الخادم
fetch('/jobs')
    .then(response => response.json())
    .then(data => {
        const jobTableBody = document.querySelector('#job-postings tbody');
        data.forEach(job => {
            const row = jobTableBody.insertRow(); // إنشاء صف جديد في الجدول
            const titleCell = row.insertCell(0);
            const descriptionCell = row.insertCell(1);
            const requirementsCell = row.insertCell(2);

            titleCell.textContent = job.title; // تعيين عنوان الوظيفة
            descriptionCell.textContent = job.description; // تعيين الوصف
            requirementsCell.textContent = job.requirements; // تعيين المتطلبات
        });
    })
    .catch(error => console.error('Error fetching jobs:', error));
