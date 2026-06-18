import { useState, useRef, useEffect } from "react";
import { db, auth } from "./firebase"; 



/* ─── Screens ─────────────────────────────────────────────────────────────── */
const S = {
  INTRO:"intro", SPLASH:"splash", SIGNIN:"signin", HOME:"home", FIND:"find", OFFER:"offer",
  RESULTS:"results", DETAIL:"detail", RIDES:"rides", PROFILE:"profile", SUCCESS:"success",
  STAT_CO2:"stat_co2", STAT_MONEY:"stat_money", STAT_RIDES:"stat_rides",
  VEHICLE:"vehicle", PAYMENT:"payment", NOTIF:"notif", ECO_DASH:"eco_dash", SAFETY:"safety", SUPPORT:"support",
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const rides = [
  { id:1,driver:"Arjun Sharma",  avatar:"AS",from:"Lucknow Charbagh",to:"Kanpur Azad Nagar",   date:"Today, 8:30 AM", seats:3,price:180,co2:"4.2 kg",rating:4.8,reviews:124,car:"Maruti Swift · UP 32 AB 1234",   tags:["AC","Music OK","Non-Smoker"],eco:"6.5 kg CO₂" },
  { id:2,driver:"Priya Patel",   avatar:"PP",from:"Bhopal MP Nagar",  to:"Indore Vijay Nagar",    date:"Today, 9:00 AM", seats:2,price:250, co2:"5.1 kg",rating:4.9,reviews:87, car:"Honda City · MP 04 XY 5678",    tags:["AC","Women-Only","Silent"],  eco:"8.2 kg CO₂" },
  { id:3,driver:"Karan Mehta",   avatar:"KM",from:"Gwalior Fort",to:"Bhopal Station", date:"Today, 9:15 AM", seats:1,price:320, co2:"6.8 kg",rating:4.7,reviews:203,car:"Hyundai i20 · MP 07 MN 9012",   tags:["AC","Pet Friendly"],        eco:"9.6 kg CO₂" },
];
// 1️⃣ Avatar Component (Jo user profile dikhayega)
function Avatar({ initials, size = 40 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #059669, #10b981)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 700,
      color: "#fff",
      flexShrink: 0
    }}>
      {initials}
    </div>
  );
}

// 2️⃣ BackBtn Component (Jo login screen par piche jaane ke liye use ho raha hai)
function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      padding: "8px",
      color: "#64748b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      ⬅️
    </button>
  );
}
/* ══════════ RESPONSIVE NAVIGATION (BRAND ALIGNED) ═════════════════════════ */
function ResponsiveNav({ active,onNavigate,isDark }) {
  const items=[
    {id:S.HOME,icon:"🏠",label:"Home"},{id:S.FIND,icon:"🔍",label:"Find"},
    {id:S.OFFER,icon:"🚗",label:"Offer"},{id:S.RIDES,icon:"📋",label:"Rides"},
    {id:S.PROFILE,icon:"👤",label:"Profile"},
  ];
  return (
    <nav className="responsive-navigation" style={{background: isDark ? "#111f38" : "rgb(98, 255, 106)", borderBottom: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #edf2f7"}}>
      {/* Brand Text matches splash alignment */}
      <div className="nav-brand-desktop" onClick={()=>onNavigate(S.HOME)}>
        <span className="brand-logo-glow">🌿</span>EcoRide
      </div>
      <div className="nav-links-wrapper">
        {items.map(it=>{
          const isAct=active===it.id;
          return (
            <button key={it.id} onClick={()=>onNavigate(it.id)}
              className={`nav-item-btn ${isAct ? 'active' : ''}`}
              style={{color: isAct ? "#10b981" : isDark ? "#94a3b8" : "#64748b"}}>
              {isAct&&<span className="active-nav-indicator" />}
              <span className="nav-icon">{it.icon}</span>
              <span className="nav-label">{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ══════════ SCREENS ════════════════════════════════════════════════════════ */
function IntroScreen({ onDone, isDark }) {
  const [dissolve,setDissolve] = useState(false);
  useEffect(()=>{
    const t1=setTimeout(()=>setDissolve(true), 1100);
    const t2=setTimeout(()=>onDone(), 1150+550);
    return ()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background: isDark ? "radial-gradient(circle, #0d3321 0%, #0a1628 100%)" : "radial-gradient(circle, #e6f4ea 0%, #f8fafc 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{fontSize:94,zIndex:1,filter:"drop-shadow(0 10px 20px rgba(16,185,129,0.2))",
        display:"inline-block",animation: dissolve ? "dissolveOut 0.55s ease forwards" : "floatLeaf 1.1s ease-in-out infinite"}}>🌿</div>
    </div>
  );
}

function SplashScreen({ onDone,onSignIn, isDark }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",background: isDark ? "radial-gradient(circle, #0d3321 0%, #0a1628 100%)" : "radial-gradient(circle, #ffffff 0%, #f1f5f9 100%)",padding:"20px"}}>
      <div style={{textAlign:"center",width:"100%",maxWidth:"400px"}}>
        {/* Fixed: Layout lock to prevent text cutting as seen in image 879469d2-b55c-43e3-8a22-f4e34530270e */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:12, width:"100%", whiteSpace:"nowrap", flexWrap:"nowrap"}}>
          <span className="brand-logo-glow" style={{fontSize:46,display:"inline-block",animation:"floatSmall 3s infinite"}}>🌿</span>
          <h1 className="brand-text-global" style={{margin:0, display:"inline-block"}}>EcoRide</h1>
        </div>
        <p style={{color:"#10b981",fontSize:13,fontWeight:800,letterSpacing:4,marginTop:4}}>INDIA · SHARE · SUSTAIN</p>
        <p style={{color: isDark ? "#f0fdf4" : "#334155",fontSize:15,marginTop:16,lineHeight:1.6}}>Smarter commutes. Greener cities.<br/>Happier India.</p>
        <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
          <button className="theme-btn-primary" onClick={onDone} style={{marginTop:48,width:220, padding:"14px 24px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}}>Get Started ➔</button>
        </div>
        <p style={{color: isDark ? "#94a3b8" : "#64748b",fontSize:13,marginTop:24}}>
          Already riding? <span onClick={onSignIn} style={{color:"#10b981",fontWeight:700,cursor:"pointer",textDecoration:"underline"}}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

function SignInScreen({ onDone,onBack, isDark }) {
  const [mobileNumber, setMobileNumber]=useState("");
  const [otp, setOtp]=useState("");
  const [showOtpField, setShowOtpField]=useState(false);
  const [loading, setLoading]=useState(false);

  function handleSendOtp() {
    if(!mobileNumber || mobileNumber.length < 10) { alert("Please enter a valid 10-digit mobile number."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setShowOtpField(true); }, 1200);
  }

  function handleVerifyOtp() {
    if(!otp || otp.length < 4) { alert("Please enter the 4-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onDone(); }, 1500);
  }

  return (
    <div style={{minHeight:"100vh",background: isDark ? "#0a1628" : "#f8fafc",padding:"40px 24px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <div style={{width:"100%", maxWidth:"420px", background: isDark ? "#111f38" : "#ffffff", padding:"36px 32px", borderRadius:"24px", boxShadow:"0 20px 40px rgba(0,0,0,0.04)", border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0"}}>
        <BackBtn onClick={onBack} label="← Back"/>
        
        <div style={{textAlign:"center",marginBottom:36, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:8, width:"100%", whiteSpace:"nowrap", flexWrap:"nowrap"}}>
            <span className="brand-logo-glow" style={{fontSize:36}}>🌿</span>
            <h2 className="brand-text-global" style={{fontSize:"38px", margin:0, padding:0}}>EcoRide</h2>
          </div>
          <p style={{color: isDark ? "#94a3b8" : "#64748b",fontSize:14, margin:"6px 0 0"}}>Verify your mobile number to securely sign in</p>
        </div>

        {!showOtpField ? (
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            <input className="theme-custom-input" placeholder="Enter 10-digit Mobile Number" type="tel" maxLength="10" value={mobileNumber} onChange={e=>setMobileNumber(e.target.value.replace(/\D/g,''))} style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
            <button className="theme-btn-primary" style={{width:"100%",marginTop:10, padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending OTP Code..." : "Send Verification OTP 📱"}
            </button>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            <p style={{fontSize:13, color:"#10b981", fontWeight:700, textAlign:"center", margin:0}}>✓ Code sent to +91 {mobileNumber}</p>
            <input className="theme-custom-input" placeholder="Enter 4-Digit OTP" type="password" maxLength="4" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,''))} style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
            <button className="theme-btn-primary" style={{width:"100%",marginTop:10, padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying OTP Code..." : "Verify & Access Dashboard ➔"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeScreen({ onNavigate, isDark }) {
  return (
    <div style={{padding:"24px 20px 100px"}} className="page-content-padding">
      <div style={{background: isDark ? "#111f38" : "linear-gradient(135deg,#ffffff,#f1f5f9)",borderRadius:24,padding:24,marginBottom:24,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{color: isDark ? "#94a3b8" : "#64748b",fontSize:14,margin:0}}>Good morning 👋</p>
            <h2 style={{margin:"4px 0 0",fontSize:28,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a"}}>Rahul Kumar</h2>
          </div>
          <div onClick={()=>onNavigate(S.PROFILE)} style={{cursor:"pointer"}}><Avatar initials="RK" size={48}/></div>
        </div>
        <div onClick={()=>onNavigate(S.FIND)} style={{marginTop:24,background: isDark ? "#152436" : "#fff",borderRadius:12,
          padding:"16px",display:"flex",alignItems:"center",gap:12,border: isDark ? "1px solid rgba(34,197,94,0.3)" : `1px solid #cbd5e1`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)", cursor:"pointer"}}>
          <span style={{fontSize:18}}>📍</span>
          <span style={{color: isDark ? "#94a3b8" : "#64748b",fontSize:15}}>Where are you going? (UP/MP Live Routes...)</span>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28}}>
        <button className="theme-btn-primary" style={{padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={()=>onNavigate(S.FIND)}>🔍 Find Ride</button>
        <button style={{padding:"14px", fontWeight:700, borderRadius:12, border: "2px solid #10b981", background:"transparent", color: "#10b981", cursor:"pointer"}} onClick={()=>onNavigate(S.OFFER)}>🚗 Offer Ride</button>
      </div>
    </div>
  );
}

function FindRideScreen({ onNavigate, isDark }) {
  return (
    <div style={{padding:"24px 20px 100px"}} className="page-content-padding">
      <h2 style={{fontSize:28,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a",margin:"0 0 4px"}}>Find a Ride 🔍</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16,background: isDark ? "#111f38" : "#fff",padding:20,borderRadius:20,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0", marginTop:20}}>
        <input className="theme-custom-input" placeholder="📍 Starting City (e.g. Bhopal)" style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
        <input className="theme-custom-input" placeholder="🏁 Destination City (e.g. Indore)" style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
        <button className="theme-btn-primary" style={{width:"100%", padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={()=>onNavigate(S.RESULTS)}>Search Live Rides ➔</button>
      </div>
    </div>
  );
}

function RideResultsScreen({ onNavigate, isDark }) {
  return (
    <div style={{padding:"24px 20px 100px"} } className="page-content-padding">
      <BackBtn onClick={()=>onNavigate(S.FIND)}/>
      <h2 style={{fontSize:24,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a",marginBottom:20}}>Available Rides</h2>
      {rides.map(ride=>(
        <div key={ride.id} onClick={()=>onNavigate(S.DETAIL,ride)} style={{background: isDark ? "#111f38" : "#fff",borderRadius:16,padding:18,marginBottom:14,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0",cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Avatar initials={ride.avatar} size={40}/>
              <div><div style={{fontWeight:700,color: isDark ? "#ffffff" : "#0f172a"}}>{ride.driver}</div><Stars rating={ride.rating}/></div>
            </div>
            <div><div style={{color:"#10b981",fontWeight:800,fontSize:20}}>₹{ride.price}</div></div>
          </div>
          <div style={{fontSize:14,color: isDark ? "#94a3b8" : "#334155",lineHeight:1.6}}>📍 {ride.from}<br/>🏁 {ride.to}</div>
        </div>
      ))}
    </div>
  );
}

function RideDetailScreen({ ride,onNavigate, isDark }) {
  if(!ride) ride=rides[0];
  return (
    <div style={{padding:"24px 20px 100px"}} className="page-content-padding">
      <BackBtn onClick={()=>onNavigate(S.RESULTS)}/>
      <div style={{background: isDark ? "#111f38" : "#fff",borderRadius:20,padding:24,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0"}}>
        <h3 style={{margin:0,fontSize:22,fontWeight:800,color: isDark ? "#ffffff" : "#0f172a"}}>{ride.driver}</h3>
        <p style={{color: isDark ? "#94a3b8" : "#334155"}}>Route: {ride.from} ➔ {ride.to}</p>
        <button className="theme-btn-primary" style={{width:"100%", padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer", marginTop:20}} onClick={()=>onNavigate(S.SUCCESS)}>Book Seat Now ➔</button>
      </div>
    </div>
  );
}

function OfferRideScreen({ onNavigate, isDark }) {
  return (
    <div style={{padding:"24px 20px 100px"}} className="page-content-padding">
      <h2 style={{fontSize:28,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a",margin:"0 0 6px"}}>Offer a Ride 🚗</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16,background: isDark ? "#111f38" : "#fff",padding:20,borderRadius:20,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0", marginTop:20}}>
        <input className="theme-custom-input" placeholder="📍 Leaving from..." style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
        <input className="theme-custom-input" placeholder="🏁 Going to..." style={{width:"100%", padding:"14px 16px", borderRadius:12, outline:"none", border: isDark ? "1px solid rgba(34,197,94,0.3)" : "1px solid #cbd5e1", background: isDark ? "#152436" : "#ffffff", color: isDark ? "#ffffff" : "#0f172a"}}/>
        <button className="theme-btn-primary" style={{width:"100%", padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={()=>onNavigate(S.SUCCESS)}>Publish Verified Ride 🌱</button>
      </div>
    </div>
  );
}

function MyRidesScreen({ isDark }) {
  return (
    <div style={{padding:"24px 20px 100px"}} className="page-content-padding">
      <h2 style={{fontSize:28,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a",marginBottom:20}}>My Rides 📋</h2>
      {rides.slice(0,2).map(ride=>(
        <div key={ride.id} style={{background: isDark ? "#111f38" : "#fff",borderRadius:16,padding:18,marginBottom:14,border: isDark ? "1px solid rgba(34,197,94,0.15)" : "1px solid #e2e8f0"}}>
          <GreenBadge>{ride.date}</GreenBadge>
          <div style={{fontWeight:700,marginTop:10,color: isDark ? "#ffffff" : "#0f172a"}}>📍 {ride.from} ➔ {ride.to}</div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen({ onNavigate, isDark, toggleTheme }) {
  return (
    <div style={{padding:"24px 20px 100px",textAlign:"center"}} className="page-content-padding">
      <Avatar initials="RK" size={80}/>
      <h2 style={{marginTop:12,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a"}}>Rahul Kumar</h2>
      <p style={{color: isDark ? "#94a3b8" : "#64748b",margin:0}}>rahul.k@gmail.com · UP-MP Region</p>
      
      {/* 🌓 LIVE THEME TOGGLE SWITCH BUTTON IN SETTINGS */}
      <div style={{marginTop:32, display:"flex", justifyContent:"center"}}>
        <button onClick={toggleTheme} style={{padding:"14px 28px", background:"linear-gradient(135deg, #0f172a, #1e293b)", color:"#ffffff", border:"none", borderRadius:12, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 15px rgba(0,0,0,0.1)", display:"flex", alignItems:"center", gap:10}}>
          🌓 Toggle Theme Mode ({isDark ? "Light Mode" : "Dark Mode"})
        </button>
      </div>

      <button style={{width:"100%",marginTop:40, padding:"14px", background:"transparent", border:"2px solid #ef4444", color:"#ef4444", fontWeight:700, borderRadius:12, cursor:"pointer"}} onClick={()=>onNavigate(S.SPLASH)}>Sign Out</button>
    </div>
  );
}

function SuccessScreen({ onNavigate, isDark }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,background: isDark ? "#0a1628" : "#ffffff"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:84,marginBottom:16}}>✅</div>
        <h2 style={{fontSize:32,fontWeight:900,color: isDark ? "#ffffff" : "#0f172a"}}>Seat Confirmed!</h2>
        <button className="theme-btn-primary" style={{width:"100%",marginTop:40, padding:"14px", fontWeight:700, borderRadius:12, border:"none", cursor:"pointer"}} onClick={()=>onNavigate(S.HOME)}>Back to Dashboard 🏠</button>
      </div>
    </div>
  );
}

/* ══════════ ROOT WITH THEME & RESPONSIVE LOGIC CONTROL ════════════════════════════════ */
export default function App() {
  const [screen,setScreen]=useState(S.INTRO);
  const [ride,setRide]=useState(null);
  
  // 🌓 Default Theme is Light, Switchable to Dark via Settings Profile
  const [isDark, setIsDark] = useState(false);

  function nav(target,data) {
    if(target===S.DETAIL&&data) setRide(data);
    setScreen(target);
    window.scrollTo?.(0,0);
  }
  
  const toggleTheme = () => setIsDark(!isDark);

  const mainNav=[S.HOME,S.FIND,S.OFFER,S.RIDES,S.PROFILE,S.RESULTS];
  const showNav=mainNav.includes(screen);

  return (
    <>
      <style>{`
        /* Imported Geometric Sans font to mimic clean Samsung Sharp Sans typography branding look */
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        *,*::before,*::after{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0; background: ${isDark ? "#060e1b" : "#f8fafc"}; -webkit-font-smoothing:antialiased; transition: background 0.3s;}
        
        /* Samsung Style Corporate geometric font assignment */
        .brand-text-global {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 900 !important;
          letter-spacing: -2px !important;
          background: linear-gradient(135deg, #10b981, #059669) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        
        .brand-logo-glow {
          color: #10b981 !important;
          filter: drop-shadow(0 4px 12px rgba(16,185,129,0.35));
        }

        .theme-btn-primary {
          background: linear-gradient(135deg,#10b981,#059669) !important;
          color: #ffffff !important;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .theme-btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(16,185,129,0.25);
        }

        /* 📱 MOBILE SCREEN SPECIFICATIONS */
        .app-container {
          width:100%; max-width:420px; margin:0 auto; min-height:100vh;
          background: ${isDark ? "#0a1628" : "#f8fafc"}; color: ${isDark ? "#f0fdf4" : "#334155"}; position:relative; overflow-x:hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.3s;
        }
        
        .responsive-navigation {
          position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 100%; max-width: 420px; z-index: 100;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.04); padding: 8px 0;
        }
        .nav-brand-desktop { display: none; }
        .nav-links-wrapper { display: flex; width: 100%; justify-content: space-around; }
        .nav-item-btn {
          background: none; border: none; cursor: pointer; display: flex;
          flex-direction: column; align-items: center; gap: 2px; flex: 1;
          font-weight: 600; font-size: 11px; position: relative;
        }
        .nav-item-btn.active { color: #10b981 !important; font-weight: 800; }
        .nav-icon { font-size: 22px; }
        .nav-label { display: block; }
        
        @keyframes floatLeaf{0%,100%{transform:translateY(0px) rotate(-6deg)}50%{transform:translateY(-14px) rotate(6deg)}}
        @keyframes floatSmall{0%,100%{transform:translateY(0px) rotate(-4deg)}50%{transform:translateY(-5px) rotate(4deg)}}
        @keyframes dissolveOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.5);filter:blur(8px)}}

        /* 🖥️ 100% RESPONSIVE FULL DASHBOARD STANDARD SHIFT */
        @media (min-width: 768px) {
          .app-container {
            max-width: 100vw !important; 
            margin: 0 !important;
            background: ${isDark ? "#0a1628" : "#ffffff"} !important;
            padding-top: 95px !important; 
            min-height: 100vh !important;
          }
          
          .page-content-padding {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 40px 20px !important;
          }
          
          .responsive-navigation {
            position: fixed !important; top: 0 !important; bottom: auto !important;
            left: 0 !important; transform: none !important; max-width: 100vw !important;
            height: 80px; justify-content: space-between;
            align-items: center; padding: 0 10% !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          }
          
          /* Fixed Header branding: Matches Font Family, Logo & Uniform Gradient look */
          .nav-brand-desktop {
            display: block !important; 
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 28px !important; 
            font-weight: 900 !important;
            letter-spacing: -2px !important;
            background: linear-gradient(135deg, #10b981, #059669) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            cursor: pointer;
          }
          
          .nav-links-wrapper { width: auto !important; gap: 28px; }
          .nav-item-btn { flex-direction: row !important; gap: 8px !important; font-size: 14px !important; padding: 8px 16px; border-radius: 10px; }
          .nav-item-btn:hover { background: ${isDark ? "#152436" : "#f8fafc"}; }
          .nav-item-btn.active { background: rgba(16,185,129,0.06); color: #059669 !important; }
          .nav-icon { font-size: 18px !important; }
          
          h1 { font-size: 56px !important; }
          h2 { font-size: 38px !important; }
          h3 { font-size: 24px !important; }
        }
      `}</style>
      
      <div className="app-container">
        {showNav && <ResponsiveNav active={screen} onNavigate={nav} isDark={isDark}/>}

        {screen===S.INTRO    && <IntroScreen onDone={()=>nav(S.SPLASH)} isDark={isDark}/>}
        {screen===S.SPLASH   && <SplashScreen onDone={()=>nav(S.HOME)} onSignIn={()=>nav(S.SIGNIN)} isDark={isDark}/>}
        {screen===S.SIGNIN   && <SignInScreen onDone={()=>nav(S.HOME)} onBack={()=>nav(S.SPLASH)} isDark={isDark}/>}
        {screen===S.HOME     && <HomeScreen     onNavigate={nav} isDark={isDark}/>}
        {screen===S.FIND     && <FindRideScreen  onNavigate={nav} isDark={isDark}/>}
        {screen===S.RESULTS  && <RideResultsScreen onNavigate={nav} isDark={isDark}/>}
        {screen===S.DETAIL   && <RideDetailScreen ride={ride} onNavigate={nav} isDark={isDark}/>}
        {screen===S.OFFER    && <OfferRideScreen  onNavigate={nav} isDark={isDark}/>}
        {screen===S.RIDES    && <MyRidesScreen    isDark={isDark}/>}
        {screen===S.PROFILE  && <ProfileScreen    onNavigate={nav} isDark={isDark} toggleTheme={toggleTheme}/>}
        {screen===S.SUCCESS  && <SuccessScreen    onNavigate={nav} isDark={isDark}/>}
      </div>
    </>
  );
}