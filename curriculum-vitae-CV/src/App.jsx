import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [job, setJob] = useState("");
  const [employer, setEmployer] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [skill4, setSkill4] = useState("");
  const [skill5, setSkill5] = useState("");
  const [descriptionss, setDescriptionss] = useState("");
  
  return (
    <div className="container">
      <div className="left-info">
        <h2>Personal Info</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
        <input 
        type="text"
        placeholder="LinkedIn"
        value={linkedIn }
        onChange={(e) => setLinkedIn(e.target.value)}
      />    
        <input
        type="text"
        placeholder="GitHub"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        />
        <h2>Education</h2>
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Employer"    
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
        />
        <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        <h2>Skills</h2>
       
      <input 
        type="text"
        placeholder="Skill-1"
        value={skill1}
        onChange={(e) => setSkill1(e.target.value)}
      />
      
        <button className="btn" onClick={() => setSkill1("")}>Remove</button>
        
      <input
        type="text"
        placeholder="Skill-2"
        value={skill2}
        onChange={(e) => setSkill2(e.target.value)}
      />
        <button className="btn" onClick={() => setSkill2("")}>Remove</button>
      <input
        type="text"
        placeholder="Skill-3"
        value={skill3}
        onChange={(e) => setSkill3(e.target.value)}
      />
        <button className="btn" onClick={() => setSkill3("")}>Remove</button>
      <input
        type="text"
        placeholder="Skill-4"
        value={skill4}
        onChange={(e) => setSkill4(e.target.value)}
      />
        <button className="btn" onClick={() => setSkill4("")}>Remove</button>
      <input
        type="text"
        placeholder="Skill-5"
        value={skill5}
        onChange={(e) => setSkill5(e.target.value)}
      />
        <button className="btn" onClick={() => setSkill5("")}>Remove</button>

        <h2></h2>
      <button
        className="btn1"
        onClick={() => {
            alert(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nJob Title: ${job}\nEmployer: ${employer}\nCity: ${city}\nDescription: ${description}\nSkill-1: ${skill1}\nSkill-2: ${skill2}\nSkill-3: ${skill3}\nSkill-4: ${skill4}\nSkill-5: ${skill5}\nDescription: ${descriptionss}` 
            );
         
        }}
      >
        Submit
      </button>
    </div>
      <div className="right-info">
        <h1>{name || "Name"}</h1>
        <h2>Contact Info</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>LinkedIn:</strong> {linkedIn}</p>
        <p><strong>GitHub:</strong> {github}</p>

         <h2>{job || "Job Title"}</h2>
        <p><strong>Employer:</strong> {employer}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Description:</strong> {description}</p>

        <h2>Skills</h2>
        <p> skill-1 :{skill1}</p>
        <p> skill-2 :{skill2}</p>
        <p> skill-3 :{skill3}</p>
        <p> skill-4 :{skill4}</p>
        <p> skill-5 :{skill5}</p>
        <h3>Small Description about Yourself and Your Goals</h3>
        <textarea
            placeholder="Description"
            value={descriptionss}
            onChange={(e) => setDescriptionss(e.target.value)}
          />
        
      </div>
    </div>
  );
}

export default App;
