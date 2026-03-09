let selectedDoctor = null;
let availableSlots = 0;
let doctorsList = {};
let feedbackData = {};  // stores feedback per doctor: { "Dr. Name": [ {name, rating, text, date}, ... ] }
let currentFeedbackDoctor = null;
let selectedRating = 0;

function showTab(tab) {
    document.getElementById('tabInfo').classList.remove('active');
    document.getElementById('tabDoctors').classList.remove('active');
    document.getElementById('tabContentInfo').style.display = 'none';
    document.getElementById('tabContentDoctors').style.display = 'none';
    if (tab === 'info') {
        document.getElementById('tabInfo').classList.add('active');
        document.getElementById('tabContentInfo').style.display = '';
    } else {
        document.getElementById('tabDoctors').classList.add('active');
        document.getElementById('tabContentDoctors').style.display = '';
    }
}

function submitAndShowDoctors() {
    var doctor = document.getElementById('doctor').value;
    var place = document.getElementById('place').value;
    if (!doctor || !place) {
        alert('Please select both Doctor Type and Place.');
        return;
    }
    showDoctors();
    showTab('doctors');
}

function showDoctors() {

    const doctor = document.getElementById("doctor").value;
    const place = document.getElementById("place").value;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    let doctors = [];

    if (doctor === "Cardiologist" && place === "Hyderabad") {
        doctors = [
            {
                name: "Dr. Ramesh Kumar",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Cardiologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Suresh Reddy",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Anitha Rao",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Behind Cyber Towers, In the Lane of IBIS Hotels, HUDA Techno Enclave, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Ravi Shankar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: " 1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Anjali Mehta",
                hospital: "Star Hospital",
                hospitalImage: "https://hyderabadboss.com/wp-content/uploads/2016/10/star-hospitals.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "8-2-596/5, Road No. 10, Gaffar Khan Colony, Banjara Hills, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Cardiologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vivek Reddy",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Cardiologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Charan",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                suggestion: "This Hospital and Doctor is best for Cardiologist in Secunderabad",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR GIRLS, Regimental Bazaar, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Raghu Rama",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Gnaneshwar Rao",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Navadeep Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/de4d4f49-515f-4183-bdbc-38aa900bc163.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Cardiologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Cardiologist in Medchal-Malkajgiri",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxmikanth Reddy",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }


    else if (doctor === "Cardiologist" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Cardiologists doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;
    }
    else if (doctor === "Cardiologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Ramu Kumar",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Cardiologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun Reddy",
                hospital: "Lims Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPPjAD81Yno1zyd4AltpkhK66lEQ4cp1lx9j-CW=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Plot No 98 Door No 23-172 Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Cardiologist" && place === "warangal") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Cardiologists doctor in Warangal. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }


    else if (doctor === "Cardiologist" && place === "Sangareddy") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Keerthi Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqklDB9MEqL7adGoExFh0yrWxtKn7l-Y6vt33b-SLmlNMPTdRsV_FbDL-dbMyHrGnsDV4izVbg7GNHw7N7fcvis98M_8OAniGs25QxulfFajnJ6PsGa9wcSk7pAGoj2HWTSALNJ=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Cardiologist in Sangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "X Roads Fasalwadi,Sangareddy,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];

    }
    else if (doctor === "Cardiologist" && place === "Kariminagar") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Cardiologists doctor in Kariminagar. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    } else if (doctor === "Cardiologist" && place === "Siddipet") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Cardiologists doctor in Siddipet. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Cardiologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Cardiologists doctor in Sircilla. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Dermatologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Hima Sekhar",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Dermatologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Jayaram ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Deepak",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Pavan ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Dermatologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Sai kumar",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Dermatologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR GIRLS, Regimental Bazaar, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Varun ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Srilakshmi",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Chandu",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Jithendra Reddy",
                hospital: "V care Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipP6PJR3ZrwPxx9XCllrVoXu5f-8bFqjC83zEHLL=s1360-w1360-h1020-rw",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Aishwarya Chambers, D.No:1-19-71/A-81/2, MAIN ROAD, Lakshmipuram Colony, Rukminipuri Colony, A. S. Rao Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Dermatologist" && place === "Medchal-Malkajgiri") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Dermatologists doctor in Medchal-Malkajgiri. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;


    }


    else if (doctor === "Dermatologist" && place === "Patancheruvu") {

        doctors = [
            {
                name: "Dr. Dinesh Kumar ",
                hospital: "Amedha Hosiptal",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/4c35669c-cb3a-4f5a-85e7-d3f070b04c09.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Dermatologist in Patancheruvu",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "H, No-14-25, beside union Bank, Sreeram Nagar Colony, Patancheruvu,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"

            },
        ];
    }
    else if (doctor === "Dermatologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Anikith Kumar",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Dermatologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Dermatologist" && place === "warangal") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Dermatologists doctor in Warangal. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }



    else if (doctor === "Dermatologist" && place === "Sangareddy") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Dermatologists doctor in Sangareddy. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Dermatologist" && place === "Kariminagar") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Dermatologists doctor in Kariminagar. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    } else if (doctor === "Dermatologist" && place === "Siddipet") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Lalitha Bhavani Hospital",
                hospitalImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_pP6tThAqOJMnaGz833k7RYquJR4s8ewKA&s",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Dermatologist in Siddipet",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Beside Seetharamanjaneya, Theatre Street Shivaji Nagar,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxmikanth Reddy",
                hospital: "Adhya Skin and Hair Transplant Clinic",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/siddipet/d3/9999p8457.8457.230818165420.c2d3/catalogue/adhya-skin-and-hair-transplant-hospital-bharath-nagar-siddipet-dermatology-hospitals-yqjpnmbyu7.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "ADHYA HOSPITAL BULIDING ,opposite Bazar cellar,Bharath Nagar,Bharth Nagar, Siddipet,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Dermatologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Dermatologist doctor in Sircilla. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Gastroenterologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Gopal Reddy",
                hospital: "AIG Hospital",
                hospitalImage: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-78945397/78945397.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Gastroenterologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "1-66/AIG/2 to 5, Mindspace Rd, P Janardhan Reddy Nagar, Gachibowli, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Mahesh Kumar",
                hospital: "PACE Hospital",
                hospitalImage: "https://irp.cdn-website.com/69c0b277/dms3rep/multi/PACE+Hospitals+-+HITEC+City.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Metro Pillar Number C1775,18 ,Hitech City Rd ,HUDA Techno Enclave, HITEC City, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Anil Kumar",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Praveen ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: " Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Ritesh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Gastroenterologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Arun ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Gastroenterologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR GIRLS, Regimental Bazaar, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Srikanth kumar",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Raghu",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Gnanesh",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Sanjay Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/de4d4f49-515f-4183-bdbc-38aa900bc163.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Gastroenterologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Santhosh Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Gastroenterologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Ravikanth Reddy",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Sandeep Rao",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "34 34/A Medchal ",
                location: "Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Rohit ",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }


    else if (doctor === "Gastroenterologist" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Gastroenterologist doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }

    else if (doctor === "Gastroenterologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Mohit Kumar",
                hospital: "Lims hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPPjAD81Yno1zyd4AltpkhK66lEQ4cp1lx9j-CW=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Gastroenterologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Plot No 98 Door No 23-172 Shamshabad, Rangareddy",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];

    }
    else if (doctor === "Gastroenterologist" && place === "warangal") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Gastroenterologist doctor in Warangal. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    } else if (doctor === "Gastroenterologist" && place === "Sangareddy") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Gastroenterologist doctor in Sangareddy. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Gastroenterologist" && place === "Kariminagar") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Gastroenterologist doctor in Kariminagar. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    } else if (doctor === "Gastroenterologist" && place === "Siddipet") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Gastroenterologist doctor in Siddipet. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;

    }
    else if (doctor === "Gastroenterologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
            <div style="text-align:center; padding:40px;">
            <h2 style="color:red;">No Doctor Available</h2>
            <p>Sorry, we currently do not have Gastroenterologist doctor in Sircilla. Please go to back try search in nearby areas.</p>
             </div>
         `;

        return;
    }


    else if (doctor === "Neurologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Neurologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Neurologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Neurologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Neurologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Neurologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }
    else if (doctor === "Neurologist" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "Neurologist" && place === "Rangareddy") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Rangareddy. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "Neurologist" && place === "warangal") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Warangal. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "Neurologist" && place === "Sangareddy") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Sangareddy. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "Neurologist" && place === "Kariminagar") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Kariminagar. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    } else if (doctor === "Neurologist" && place === "Siddipet") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Siddipet. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "Neurologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Neurologist doctor in Sircilla. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "orthopedic Surgeon" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for orthopedic Surgery in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }

    else if (doctor === "orthopedic Surgeon" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for orthopedic Surgery in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "orthopedic Surgeon" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for orthopedic Surgery in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "orthopedic Surgeon" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have orthopedic Surgeon doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "orthopedic Surgeon" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Ram Kumar",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for orthopedic Surgeon in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Varun Reddy",
                hospital: "Lims Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPPjAD81Yno1zyd4AltpkhK66lEQ4cp1lx9j-CW=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Plot No 98 Door No 23-172 Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];


    }
    else if (doctor === "orthopedic Surgeon" && place === "warangal") {

        doctors = [
            {
                name: "Dr. Mahesh",
                hospital: "Veena Medicare Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMHb_CHpNVIlaiVWHkNrwWoHQda5cNmMG87mXjq=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Orthopedic Surgeon in Warangal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "6-2-103, Beside Vijaya Talkies, Gandhi Nagar, Kakaji Nagar Colony, Hanamkonda, Telangana 506011",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxmi Reddy",
                hospital: "Ekashilla Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMpVOdKl__2_xLEopOrVw0McyfGicNgj0VaA7x0=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: " opposite Kuda Office, near Ashoka Hotel, Sai Nagar, Hanamkonda, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "orthopedic Surgeon" && place === "Sangareddy") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have orthopedic Surgeon doctor in Sangareddy. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "orthopedic Surgeon" && place === "Kariminagar") {

        doctors = [
            {
                name: "Dr. Rahul Kumar",
                hospital: "Renee Hosiptal",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweopEpIm9pQ6i2CFwAvY9foEerNtsMld4VrBSbjeofIdmrHrlmCiMR72a912tDi6gjXQnmlM5F2cCk3iD00mTf5xrlXtROpP_c9C7JkavKWdOZjlaPZYbyo2w68cDJv_BtUKhbje8w=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Orthopedic Surgeon in Kariminagar",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Renee Best Multispeciality Hospital|Best Hospital in Karimnagar,Telangana, Adarsha Nagar, Indira Nagar Colony, Karimnagar,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Ranjith Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerDtwMyHDHF_kSOgLkBGZaq8Dh50doUCEUuDLOHsyVFXh2lck21RRdq_JGp46gxhs7u-GzvjAbMqfvnaR9b5ejDCE1sLOyLF30PtCu_hPaxywHcxQ5-9qUnbo7M_EUuKiQjzPhi=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Old Employment Office Road Civil Hospital Back-side, Christian Colony, Karimnagar, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    } else if (doctor === "orthopedic Surgeon" && place === "Siddipet") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "GOVERNMENT GENERAL HOSPITAL SIDDIPET",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerYuMF3HP2l_wQhu4wRoSShA8_-wkk3UO33pvo9zn0pMipSNKotGtuDkVmrOTIldAWD4XU6bLwuLR0W6zVshUG1_QOQCwjX9sZNYsJrBL5JfXhe7xQfVsG8jzh--0mvfqP2g41LJxBB1AY=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Orthopedic Surgeon in Siddipet",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " ENSANPALLY SIDDIPET, Siddipet Govt Medical College Rd, Siddipet, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "orthopedic Surgeon" && place === "Sircilla") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have orthopedic Surgeon doctor in Sircilla. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }

    else if (doctor === "gynecologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "gynecologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "gynecologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "gynecologist" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have gynecologist doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "gynecologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Raghu Kumar",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "gynecologist" && place === "warangal") {

        doctors = [
            {
                name: "Dr. Ramesh",
                hospital: "Veena Medicare Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMHb_CHpNVIlaiVWHkNrwWoHQda5cNmMG87mXjq=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Warangal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "6-2-103, Beside Vijaya Talkies, Gandhi Nagar, Kakaji Nagar Colony, Hanamkonda, Telangana 506011",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxmi siri",
                hospital: "Ekashilla Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMpVOdKl__2_xLEopOrVw0McyfGicNgj0VaA7x0=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: " opposite Kuda Office, near Ashoka Hotel, Sai Nagar, Hanamkonda, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "gynecologist" && place === "Sangareddy") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have gynecologist doctor in Sangareddy. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "gynecologist" && place === "Kariminagar") {


        doctors = [
            {
                name: "Dr.Kumar",
                hospital: "Renee Hosiptal",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweopEpIm9pQ6i2CFwAvY9foEerNtsMld4VrBSbjeofIdmrHrlmCiMR72a912tDi6gjXQnmlM5F2cCk3iD00mTf5xrlXtROpP_c9C7JkavKWdOZjlaPZYbyo2w68cDJv_BtUKhbje8w=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Kariminagar",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Renee Best Multispeciality Hospital|Best Hospital in Karimnagar,Telangana, Adarsha Nagar, Indira Nagar Colony, Karimnagar,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Lalitha Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerDtwMyHDHF_kSOgLkBGZaq8Dh50doUCEUuDLOHsyVFXh2lck21RRdq_JGp46gxhs7u-GzvjAbMqfvnaR9b5ejDCE1sLOyLF30PtCu_hPaxywHcxQ5-9qUnbo7M_EUuKiQjzPhi=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Old Employment Office Road Civil Hospital Back-side, Christian Colony, Karimnagar, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];
    } else if (doctor === "gynecologist" && place === "Siddipet") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "GOVERNMENT GENERAL HOSPITAL SIDDIPET",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerYuMF3HP2l_wQhu4wRoSShA8_-wkk3UO33pvo9zn0pMipSNKotGtuDkVmrOTIldAWD4XU6bLwuLR0W6zVshUG1_QOQCwjX9sZNYsJrBL5JfXhe7xQfVsG8jzh--0mvfqP2g41LJxBB1AY=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Siddipet",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " ENSANPALLY SIDDIPET, Siddipet Govt Medical College Rd, Siddipet, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "gynecologist" && place === "Sircilla") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Siri Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPARIhTs6vrJhpvVvRQ3M1-eSu-mx30qg7YBqWF=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for gynecologist in Sircilla",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "SH 11, Padma Nagar, Shanti Nagar, Sircilla,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
        ];

    }
    else if (doctor === "Nephrologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Nephrologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Nephrologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "Nephrologist" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Nephrologist doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "Nephrologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Rajesh Kumar",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];
    }
    else if (doctor === "Nephrologist" && place === "warangal") {

        doctors = [
            {
                name: "Dr. Ramesh",
                hospital: "Veena Medicare Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMHb_CHpNVIlaiVWHkNrwWoHQda5cNmMG87mXjq=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Warangal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "6-2-103, Beside Vijaya Talkies, Gandhi Nagar, Kakaji Nagar Colony, Hanamkonda, Telangana 506011",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Laxmi siri",
                hospital: "Ekashilla Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMpVOdKl__2_xLEopOrVw0McyfGicNgj0VaA7x0=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: " opposite Kuda Office, near Ashoka Hotel, Sai Nagar, Hanamkonda, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Nephrologist" && place === "Sangareddy") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Sreshta Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/8c2ec5cc-897b-46af-989c-4380547a89a0.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Sangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Number 23-72, Ashok Nagar, RC Puram, Landmark: Near Jyothi Theatre,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];

    }
    else if (doctor === "Nephrologist" && place === "Kariminagar") {

        doctors = [
            {
                name: "Dr.Ramu",
                hospital: "Renee Hosiptal",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweopEpIm9pQ6i2CFwAvY9foEerNtsMld4VrBSbjeofIdmrHrlmCiMR72a912tDi6gjXQnmlM5F2cCk3iD00mTf5xrlXtROpP_c9C7JkavKWdOZjlaPZYbyo2w68cDJv_BtUKhbje8w=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Kariminagar",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Renee Best Multispeciality Hospital|Best Hospital in Karimnagar,Telangana, Adarsha Nagar, Indira Nagar Colony, Karimnagar,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Ankith Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerDtwMyHDHF_kSOgLkBGZaq8Dh50doUCEUuDLOHsyVFXh2lck21RRdq_JGp46gxhs7u-GzvjAbMqfvnaR9b5ejDCE1sLOyLF30PtCu_hPaxywHcxQ5-9qUnbo7M_EUuKiQjzPhi=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Old Employment Office Road Civil Hospital Back-side, Christian Colony, Karimnagar, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    } else if (doctor === "Nephrologist" && place === "Siddipet") {

        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "GOVERNMENT GENERAL HOSPITAL SIDDIPET",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerYuMF3HP2l_wQhu4wRoSShA8_-wkk3UO33pvo9zn0pMipSNKotGtuDkVmrOTIldAWD4XU6bLwuLR0W6zVshUG1_QOQCwjX9sZNYsJrBL5JfXhe7xQfVsG8jzh--0mvfqP2g41LJxBB1AY=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Siddipet",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " ENSANPALLY SIDDIPET, Siddipet Govt Medical College Rd, Siddipet, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Nephrologist" && place === "Sircilla") {

        doctors = [
            {
                name: "Dr. Ravi Redddy",
                hospital: "Siri Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPARIhTs6vrJhpvVvRQ3M1-eSu-mx30qg7YBqWF=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Nephrologist in Sircilla",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "SH 11, Padma Nagar, Shanti Nagar, Sircilla,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
        ];


    }
    else if (doctor === "Endocrinologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Endocrinologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Endocrinologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "Endocrinologist" && place === "Patancheruvu") {

        doctors = [
            {
                name: "Dr. Dinesh  ",
                hospital: "Amedha Hosiptal",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/4c35669c-cb3a-4f5a-85e7-d3f070b04c09.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Patancheruvu",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "H, No-14-25, beside union Bank, Sreeram Nagar Colony, Patancheruvu,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"

            },
        ];
    }
    else if (doctor === "Endocrinologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Sravani ",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Lakshmi ",
                hospital: "Lims Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPPjAD81Yno1zyd4AltpkhK66lEQ4cp1lx9j-CW=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Plot No 98 Door No 23-172 Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];
    }
    else if (doctor === "Endocrinologist" && place === "warangal") {

        doctors = [
            {
                name: "Dr. Srikanth ",
                hospital: "Veena Medicare Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMHb_CHpNVIlaiVWHkNrwWoHQda5cNmMG87mXjq=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Warangal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "6-2-103, Beside Vijaya Talkies, Gandhi Nagar, Kakaji Nagar Colony, Hanamkonda, Telangana 506011",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. siri",
                hospital: "Ekashilla Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMpVOdKl__2_xLEopOrVw0McyfGicNgj0VaA7x0=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: " opposite Kuda Office, near Ashoka Hotel, Sai Nagar, Hanamkonda, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Endocrinologist" && place === "Sangareddy") {
        doctors = [
            {
                name: "Dr. Ravi Kumar",
                hospital: "Sreshta Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/8c2ec5cc-897b-46af-989c-4380547a89a0.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Sangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Number 23-72, Ashok Nagar, RC Puram, Landmark: Near Jyothi Theatre,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];


    }
    else if (doctor === "Endocrinologist" && place === "Kariminagar") {

        doctors = [
            {
                name: "Dr.Lavanya ",
                hospital: "Renee Hosiptal",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweopEpIm9pQ6i2CFwAvY9foEerNtsMld4VrBSbjeofIdmrHrlmCiMR72a912tDi6gjXQnmlM5F2cCk3iD00mTf5xrlXtROpP_c9C7JkavKWdOZjlaPZYbyo2w68cDJv_BtUKhbje8w=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Endocrinologist in Kariminagar",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Renee Best Multispeciality Hospital|Best Hospital in Karimnagar,Telangana, Adarsha Nagar, Indira Nagar Colony, Karimnagar,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Lokesh Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerDtwMyHDHF_kSOgLkBGZaq8Dh50doUCEUuDLOHsyVFXh2lck21RRdq_JGp46gxhs7u-GzvjAbMqfvnaR9b5ejDCE1sLOyLF30PtCu_hPaxywHcxQ5-9qUnbo7M_EUuKiQjzPhi=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Old Employment Office Road Civil Hospital Back-side, Christian Colony, Karimnagar, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];
    } else if (doctor === "Endocrinologist" && place === "Siddipet") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Endocrinologist doctor in Siddipet. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "Endocrinologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Endocrinologist doctor in Sircilla. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "Otolaryngologist" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "Otolaryngologist" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "Otolaryngologist" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "Otolaryngologist" && place === "Patancheruvu") {

        doctors = [
            {
                name: "Dr. Varshith  ",
                hospital: "Amedha Hosiptal",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/4c35669c-cb3a-4f5a-85e7-d3f070b04c09.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Patancheruvu",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "H, No-14-25, beside union Bank, Sreeram Nagar Colony, Patancheruvu,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"

            },
        ];
    }
    else if (doctor === "Otolaryngologist" && place === "Rangareddy") {

        doctors = [
            {
                name: "Dr. Sunil Kumar ",
                hospital: "Trident Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoGGfY8aFF09T9gXIMtYn7nH8kEVn-1xXMyRC1FoeNOPlc6CX-pKOlaqWwcX8dAi7Xxfz5DKiNO0YGM40zV5dycsdsBO8aX9D7i6kz6gWo5kTqlv43u9BxisG4fixi5SBTvezavaw=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Rangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: " 23_178/A, Madhura Nagar, Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandra Shekhar ",
                hospital: "Lims Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipPPjAD81Yno1zyd4AltpkhK66lEQ4cp1lx9j-CW=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Plot No 98 Door No 23-172 Shamshabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Otolaryngologist" && place === "warangal") {

        doctors = [
            {
                name: "Dr. Srikanth ",
                hospital: "Veena Medicare Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/p/AF1QipMHb_CHpNVIlaiVWHkNrwWoHQda5cNmMG87mXjq=s1360-w1360-h1020-rw",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Warangal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "6-2-103, Beside Vijaya Talkies, Gandhi Nagar, Kakaji Nagar Colony, Hanamkonda, Telangana 506011",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    }
    else if (doctor === "Otolaryngologist" && place === "Sangareddy") {

        doctors = [
            {
                name: "Dr. Manoj Reddy",
                hospital: "Sreshta Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/8c2ec5cc-897b-46af-989c-4380547a89a0.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for Otolaryngologist in Sangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Number 23-72, Ashok Nagar, RC Puram, Landmark: Near Jyothi Theatre,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];


    }
    else if (doctor === "Otolaryngologist" && place === "Kariminagar") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Otolaryngologist doctor in Kariminagar. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    } else if (doctor === "Otolaryngologist" && place === "Siddipet") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Otolaryngologist doctor in Siddipet. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "Otolaryngologist" && place === "Sircilla") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have Otolaryngologist doctor in Sircilla. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }


    else if (doctor === "General Surgeon" && place === "Hyderabad") {

        doctors = [
            {
                name: "Dr. Naresh ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://medicaldialogues.in/h-upload/2023/01/19/40x30_198899-apollo-hospital-1.webp",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for General Surgeon in Hyderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Jubilee Hills,Rd Number 72, opposite Bharatiya Vidya Bhavan School, Film Nagar, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Prakash",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.myhospitalnow.com/hospitals/storage/hospital_profile/2023-05-03-1758955903_1719917382.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Survey No. 41/14, JNTU to Hitech City Main Road, Khanamet Village, Kothaguda, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Devendra Rao",
                hospital: "Care Hospitals",
                hospitalImage: "https://www.carehospitals.com/assets/images/main/care-hitech-new.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Block A, Old Mumbai Hwy, near Cyberabad Police Commissionerate, Jayabheri Pine Valley, HITEC City, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Shanakar",
                hospital: "KIMS Hospital",
                hospitalImage: "https://tse2.mm.bing.net/th/id/OIP.yYm5kQW4xdPR0MyfIUfQkgHaE-?pid=Api&P=0&h=180https://medicaldialogues.in/wp-content/uploads/2017/01/KIMS-Hospitals-Kondapur.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Not Available",
                location: "1-112/86, Survey No 55/ EE, Kondapur Village, Serilingampally Mandal, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Manoj ",
                hospital: "NIMS Hospital",
                hospitalImage: "https://th-i.thgim.com/public/migration_catalog/article13462295.ece/alternates/FREE_1200/HY22NIMS",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Punjagutta Rd, Punjagutta Market, Punjagutta, Hyderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }
        ];
    }
    else if (doctor === "General Surgeon" && place === "Secunderabad") {

        doctors = [
            {
                name: "Dr.  Vinay ",
                hospital: "Apollo Hospital",
                hospitalImage: "https://images1-fabric.practo.com/practices/936372/apollo-hospital-hyderabad-5cee1def74974.JPG",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for General Surgeon in Secunderabad",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Pollicetty Towers, St Johns Rd, beside KEYES HIGH SCHOOL FOR",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Bhaskar ",
                hospital: "Yashoda Hospital",
                hospitalImage: "https://www.yashodahospitals.com/wp-content/uploads/2024/12/Secunderabad-unit.png",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr.  Venkatesh ",
                hospital: "Gandhi Hospital",
                hospitalImage: "https://media.telanganatoday.com/wp-content/uploads/2025/04/Gandhi-Hospital.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "M.I.G.H colony, Musheerabad, Walker Town, Padmarao Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Srinivas ",
                hospital: "KIMS Hospital",
                hospitalImage: "https://www.cnexguidance.com/wp-content/uploads/2019/08/KIMS-Hospital-Secunderabad.jpg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "1-8-31/1, Minister Road Krishna Nagar Colony, Ramgopalpet, Begumpet, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr.  Shekhar ",
                hospital: "Medicover Hospital",
                hospitalImage: "https://www.medicoverhospitals.in/images/hospitals/city/hitec-city-hyderabad-800.webp",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "Sarojini Devi Rd, Regimental Bazaar, Shivaji Nagar, Secunderabad,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];
    }
    else if (doctor === "General Surgeon" && place === "Medchal-Malkajgiri") {

        doctors = [
            {
                name: "Dr. Uday Kumar",
                hospital: "Medinova Hospital",
                hospitalImage: "https://mims.edu.in/wp-content/uploads/elementor/thumbs/Medinova-N-ra2ucx3s6bgar8qutvwgsd1cos24i0fputqueguby8.jpg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for General Surgeon in Medchal",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "13-254, NH 44, opp. Asian Mukund theatre, Chandra Nagar, Medchal,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Harish",
                hospital: "Malla Reddy Narayana Multispeciality Hospital",
                hospitalImage: "https://content.jdmagicbox.com/v2/comp/hyderabad/a8/040pxx40.xx40.090630094639.a4a8/catalogue/mallareddy-narayana-multispeciality-hospital-jeedimetla-hyderabad-hospitals-f7a1m6gqnl.jpg",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "1-1-216, Suraram'X' Roads, Jeedimetla Medchal-malkajgiri,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Chandrakanth",
                hospital: "Renova Hospital",
                hospitalImage: "https://medifyhome.com/wp-content/uploads/2023/12/Untitled-design-4.png",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "34 34/A Medchal Rd, Gachibowli, Medchal Rd, NCL Enclave South,Petbasheerabad,Kompally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },
            {
                name: "Dr. Tarun",
                hospital: "MedOne Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/6becc540-ab91-4f4f-9554-befdc1f825f5.jpeg",
                rating: 4.2,
                timing: "8:00 AM - 12:00 PM",
                status: "Available",
                location: "Survey No.42,Pipeline Rd, next to Centro,Suchitra,Kompally",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

            {
                name: "Dr. Laxman ",
                hospital: "Goutham Hospital",
                hospitalImage: "https://content3.jdmagicbox.com/v2/comp/hyderabad/w6/040pxx40.xx40.190506191937.z8w6/catalogue/goutam-neuro-care-kphb-colony-hyderabad-neurologists-1sba96hz29.jpg",
                rating: 4.6,
                timing: "11:00 AM - 3:00 PM",
                status: "Available",
                location: "H.No.261, MIG, Road No. 4, Kukatpally Housing Board Colony, K P H B Phase 1, Kukatpally,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            }

        ];

    }


    else if (doctor === "General Surgeon" && place === "Patancheruvu") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have General Surgeon doctor in Patancheruvu. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;
    }
    else if (doctor === "General Surgeon" && place === "Rangareddy") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have General Surgeon doctor in Rangareddy. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;

    }
    else if (doctor === "General Surgeon" && place === "warangal") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have General Surgeon doctor in warangal. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;


    }
    else if (doctor === "General Surgeon" && place === "Sangareddy") {

        doctors = [
            {
                name: "Dr. Sreeharsha Reddy",
                hospital: "Sreshta Hospital",
                hospitalImage: "https://skedoccoresa.blob.core.windows.net/skedoc-images/hospitalimages/8c2ec5cc-897b-46af-989c-4380547a89a0.jpeg",
                rating: 4.8,
                suggestion: "This Hospital and Doctor is best for General Surgeon in Sangareddy",
                timing: "9:00 AM - 1:00 PM",
                status: "Available",
                location: "Number 23-72, Ashok Nagar, RC Puram, Landmark: Near Jyothi Theatre,",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },


        ];
    }
    else if (doctor === "General Surgeon" && place === "Kariminagar") {

        doctors = [
            {
                name: "Dr. Roshan Reddy",
                hospital: "Medicover Hospital",
                hospitalImage: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerDtwMyHDHF_kSOgLkBGZaq8Dh50doUCEUuDLOHsyVFXh2lck21RRdq_JGp46gxhs7u-GzvjAbMqfvnaR9b5ejDCE1sLOyLF30PtCu_hPaxywHcxQ5-9qUnbo7M_EUuKiQjzPhi=s1360-w1360-h1020-rw",
                rating: 4.3,
                timing: "10:00 AM - 4:00 PM",
                status: "Available",
                location: "Old Employment Office Road Civil Hospital Back-side, Christian Colony, Karimnagar, ",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu83J9kqtU2g72BIhD68RHSeSP77OycSCb0OWdehR5gw&s"
            },

        ];

    } else if (doctor === "General Surgeon" && place === "Siddipet") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have General Surgeon doctor in siddipet. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;


    }
    else if (doctor === "General Surgeon" && place === "Sircilla") {

        resultDiv.innerHTML = `
                  <div style="text-align:center; padding:40px;">
                  <h2 style="color:red;">No Doctor Available</h2>
                  <p>Sorry, we currently do not have General Surgeon doctor in sircilla. Please go to back try search in nearby areas.</p>
                  </div>
                  `;
        return;



    }
    else {
        resultDiv.innerHTML = "<h3>No Doctors Available</h3>";
        // Switch to doctors tab even if empty
        showTab('doctors');
        return;
    }

    // Initialize or preserve slots and store doctors in object for reference
    doctors.forEach(doc => {
        // Preserve existing slot count if present, otherwise default to 10
        const existing = doctorsList[doc.name];
        doc.slots = existing && typeof existing.slots === 'number' ? existing.slots : 10;
        doctorsList[doc.name] = doc;
    });

    // Display doctors
    doctors.forEach(function (doc) {

        const statusTrim = doc.status ? doc.status.trim() : '';
        const statusColor = statusTrim === "Available" ? "green" : "red";
        const statusIcon = statusTrim === "Available" ? "🟢" : "🔴";
        const isDisabled = statusTrim === "Not Available" || doc.slots === 0;
        const slotColor = doc.slots > 0 ? "green" : "red";

        resultDiv.innerHTML += `
            <div class="doctor-card">
                <img src="${doc.image}" class="doctor-img">
                <h3>${doc.name}</h3>
                <p><strong>Hospital:</strong> ${doc.hospital}</p>
                <img src="${doc.hospitalImage}" class="hospital-img">
                <p><strong>Rating:</strong> ${doc.rating}</p>
                ${doc.suggestion ? `<p><strong>Suggestion:</strong> "${doc.suggestion}"</p>` : ''}
                <p><strong>Available Time:</strong> ${doc.timing}</p>
                <p><strong>Location:</strong> ${doc.location}</p>
                <div class="status">
                    <span style="font-size:1.3rem;">${statusIcon}</span> <span>${statusTrim}</span>
                </div>
                <div class="slots">Available Slots: ${doc.slots}</div>
                <button class="book-btn" ${isDisabled ? "disabled" : ""} onclick="openModal('${doc.name}')">
                    Book Appointment
                </button>
                <button class="feedback-btn" onclick="openFeedbackModal('${doc.name}')">
                     Give Feedback
                </button>
                <div class="feedback-list" id="feedback-${doc.name.replace(/[^a-zA-Z]/g, '')}">
                    ${renderFeedback(doc.name)}
                </div>
            </div>
        `;
    });
}

// On page load, show info tab
window.onload = function () {
    showTab('info');
    // Enable/disable submit button based on selections
    var doctorSel = document.getElementById('doctor');
    var placeSel = document.getElementById('place');
    var submitBtn = document.getElementById('submitBtn');
    function checkSelections() {
        submitBtn.disabled = !(doctorSel.value && placeSel.value);
    }
    doctorSel.addEventListener('change', checkSelections);
    placeSel.addEventListener('change', checkSelections);
    checkSelections();
}

function openModal(doctorName) {
    selectedDoctor = doctorName;
    availableSlots = doctorsList[doctorName].slots;
    document.getElementById("selectedDoctorName").textContent = doctorName;
    document.getElementById("availableSlots").textContent = availableSlots;
    document.getElementById("bookingModal").style.display = "block";
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
    // Clear form fields
    document.getElementById("patientName").value = "";
    document.getElementById("patientPhone").value = "";
    document.getElementById("preferredDate").value = "";
}

function confirmBooking() {
    let name = document.getElementById("patientName").value.trim();
    // sanitize name: allow only letters and spaces
    name = name.replace(/[^A-Za-z\s]/g, '').trim();
    document.getElementById("patientName").value = name;
    let phone = document.getElementById("patientPhone").value.trim();
    phone = phone.replace(/\D/g, '');
    document.getElementById("patientPhone").value = phone;
    const date = document.getElementById("preferredDate").value;
    // require all fields
    if (!name || !phone || phone.length !== 10 || !date) {
        alert("Please fill all details.");
        return;
    }

    if (name === "" || phone === "" || date === "") {
        alert("Please fill in all fields");
        return;
    }

    // Reduce slots (only if available)
    if (!doctorsList[selectedDoctor] || doctorsList[selectedDoctor].slots <= 0) {
        alert("No slots available for this doctor.");
        return;
    }
    doctorsList[selectedDoctor].slots--;
    // update modal display
    document.getElementById("availableSlots").textContent = doctorsList[selectedDoctor].slots;

    alert("Appointment booked successfully!\n\n" +
        "Doctor: " + selectedDoctor +
        "\nPatient: " + name +
        "\nPhone: " + phone +
        "\nDate: " + formatDateDMY(date));
    // Helper to format date as DD-MM-YYYY
    function formatDateDMY(dateStr) {
        if (!dateStr) return "";
        const [yyyy, mm, dd] = dateStr.split("-");
        return `${dd}-${mm}-${yyyy}`;
    }

    closeModal();

    const doctor = document.getElementById("doctor").value;
    const place = document.getElementById("place").value;
    if (doctor && place) {
        showDoctors();
    }
}

// === Feedback Functions ===

function openFeedbackModal(doctorName) {
    currentFeedbackDoctor = doctorName;
    selectedRating = 0;
    document.getElementById("feedbackDoctorName").textContent = doctorName;
    document.getElementById("feedbackName").value = "";
    document.getElementById("feedbackText").value = "";
    // Reset stars
    document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('selected'));
    document.getElementById("feedbackModal").style.display = "block";
}

function closeFeedbackModal() {
    document.getElementById("feedbackModal").style.display = "none";
    currentFeedbackDoctor = null;
    selectedRating = 0;
}

function setRating(value) {
    selectedRating = value;
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(s => {
        s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= value);
    });
}

function hoverRating(value) {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(s => {
        const v = parseInt(s.getAttribute('data-value'));
        s.style.color = v <= value ? '#f59e0b' : '#cbd5e1';
    });
}

function resetHover() {
    const stars = document.querySelectorAll('#starRating .star');
    stars.forEach(s => {
        const v = parseInt(s.getAttribute('data-value'));
        s.style.color = v <= selectedRating ? '#f59e0b' : '#cbd5e1';
    });
}

function submitFeedback() {
    const name = document.getElementById("feedbackName").value.trim();
    const text = document.getElementById("feedbackText").value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }
    if (selectedRating === 0) {
        alert("Please select a star rating.");
        return;
    }
    if (!text) {
        alert("Please write your feedback.");
        return;
    }

    // Store feedback
    if (!feedbackData[currentFeedbackDoctor]) {
        feedbackData[currentFeedbackDoctor] = [];
    }
    feedbackData[currentFeedbackDoctor].push({
        name: name,
        rating: selectedRating,
        text: text,
        date: new Date().toLocaleDateString('en-IN')
    });

    alert("Thank you for your feedback!");
    closeFeedbackModal();

    // Refresh doctor list to show new feedback
    const doctor = document.getElementById("doctor").value;
    const place = document.getElementById("place").value;
    if (doctor && place) {
        showDoctors();
    }
}

function renderFeedback(doctorName) {
    const feedbacks = feedbackData[doctorName];
    if (!feedbacks || feedbacks.length === 0) {
        return '<h4>📝 No feedback yet</h4>';
    }
    let html = `<h4>📝 Feedback (${feedbacks.length})</h4>`;
    feedbacks.forEach(fb => {
        const stars = '★'.repeat(fb.rating) + '☆'.repeat(5 - fb.rating);
        html += `
                    <div class="feedback-item">
                        <div class="fb-stars">${stars}</div>
                        <p class="fb-text">"${fb.text}"</p>
                        <span class="fb-author">— ${fb.name} | ${fb.date}</span>
                    </div>
                `;
    });
    return html;
}

// Close modal if user clicks outside of it
window.onclick = function (event) {
    const bookingModal = document.getElementById("bookingModal");
    const feedbackModal = document.getElementById("feedbackModal");
    if (event.target === bookingModal) {
        closeModal();
    }
    if (event.target === feedbackModal) {
        closeFeedbackModal();
    }
}

