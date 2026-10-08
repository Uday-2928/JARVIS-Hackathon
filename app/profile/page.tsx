export default function StudentProfilePage() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-mark">A</span>
            <span>AI Campus Agent</span>
          </div>
          <div className="header-actions">
            <a href="/student" className="secondary-btn">Back to dashboard</a>
            <a href="/" className="ghost-btn">Logout</a>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 36, paddingBottom: 48 }}>
        <div className="page-header">
          <div>
            <div className="pill">Profile completion: 92%</div>
            <h1 style={{ marginTop: 12 }}>Complete your student profile</h1>
          </div>
          <button type="button" className="primary-btn">Save profile</button>
        </div>

        <form className="profile-form">
          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="two-col">
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" defaultValue="Aarav Sharma" />
              </div>
              <div className="field">
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" defaultValue="2004-05-12" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" defaultValue="aarav.sharma@college.edu" />
              </div>
              <div className="field">
                <label htmlFor="mobile">Mobile Number</label>
                <input id="mobile" defaultValue="+91 9876543210" />
              </div>
              <div className="field">
                <label htmlFor="location">Location</label>
                <input id="location" defaultValue="Hyderabad" />
              </div>
              <div className="field">
                <label htmlFor="state">State</label>
                <input id="state" defaultValue="Telangana" />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Academic Details</h3>
            <div className="three-col">
              <div className="field">
                <label htmlFor="college">College Name</label>
                <input id="college" defaultValue="VNR Vignana Jyothi" />
              </div>
              <div className="field">
                <label htmlFor="degree">Degree</label>
                <input id="degree" defaultValue="B.Tech" />
              </div>
              <div className="field">
                <label htmlFor="department">Department / Branch</label>
                <input id="department" defaultValue="Electronics & Communication" />
              </div>
              <div className="field">
                <label htmlFor="year">Current Year</label>
                <select id="year" defaultValue="2">
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="semester">Semester</label>
                <input id="semester" defaultValue="4" />
              </div>
              <div className="field">
                <label htmlFor="cgpa">CGPA / Percentage</label>
                <input id="cgpa" defaultValue="8.9" />
              </div>
              <div className="field">
                <label htmlFor="tenth">10th Percentage</label>
                <input id="tenth" defaultValue="96.2" />
              </div>
              <div className="field">
                <label htmlFor="twelfth">12th Percentage</label>
                <input id="twelfth" defaultValue="95.8" />
              </div>
              <div className="field">
                <label htmlFor="backlogs">Backlogs</label>
                <input id="backlogs" defaultValue="0" />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Placement Profile</h3>
            <div className="two-col">
              <div className="field">
                <label htmlFor="roles">Preferred Job Roles</label>
                <input id="roles" defaultValue="Software Engineer, Machine Learning Intern, Embedded Engineer" />
              </div>
              <div className="field">
                <label htmlFor="industries">Preferred Industries</label>
                <input id="industries" defaultValue="AI, Software, Embedded Systems" />
              </div>
              <div className="field">
                <label htmlFor="domains">Domains</label>
                <input id="domains" defaultValue="AI / ML, Embedded Systems, IoT" />
              </div>
              <div className="field">
                <label htmlFor="locations">Preferred Locations</label>
                <input id="locations" defaultValue="Hyderabad, Bengaluru, Remote" />
              </div>
              <div className="field">
                <label htmlFor="salary">Expected Salary Range</label>
                <input id="salary" defaultValue="₹8L - ₹12L" />
              </div>
              <div className="field">
                <label htmlFor="workType">Preferred Work Type</label>
                <select id="workType" defaultValue="hybrid">
                  <option value="fulltime">Full-time</option>
                  <option value="internship">Internship</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Skills & Interests</h3>
            <div className="two-col">
              <div className="field">
                <label htmlFor="skills">Programming & Technical Skills</label>
                <textarea id="skills" rows={4} defaultValue="Python, C, C++, Java, SQL, ML, OpenCV, Embedded Systems, IoT, Git, VS Code" />
              </div>
              <div className="field">
                <label htmlFor="interests">Career Interests</label>
                <textarea id="interests" rows={4} defaultValue="AI, Machine Learning, Robotics, Research, Product Development" />
              </div>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
