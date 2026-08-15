import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  BookOpen, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  ExternalLink, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Database,
  RefreshCw,
  Eye,
  Check,
  Upload,
  Image as ImageIcon,
  Camera,
  RotateCcw
} from 'lucide-react';
import { 
  adminLogin, 
  adminCheckMe, 
  adminUpdateProfile,
  adminUploadImage,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
  adminCreateResearch,
  adminUpdateResearch,
  adminDeleteResearch,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill,
  adminCreateExperience,
  adminUpdateExperience,
  adminDeleteExperience,
  adminCreateEducation,
  adminUpdateEducation,
  adminDeleteEducation,
  adminCreateCertification,
  adminUpdateCertification,
  adminDeleteCertification,
  adminFetchMessages,
  adminMarkMessageRead,
  adminDeleteMessage,
  adminChangePassword,
  authService,
  ContactMessage,
  ProfileData
} from '../../services/api';
import { useData } from '../../context/DataContext';
import defaultPortraitImg from '../../assets/images/colliner_portrait_1786735551357.jpg';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    profile, 
    projects, 
    services, 
    research, 
    skills, 
    experience, 
    education, 
    certifications, 
    refreshData 
  } = useData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState<string>('phostacolliner@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('admin12345');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'services' | 'research' | 'skills' | 'experience' | 'education' | 'profile' | 'messages' | 'security'>('overview');

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

  // Notification / Toast
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals & Editing states
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  const [editingService, setEditingService] = useState<any | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  const [editingResearch, setEditingResearch] = useState<any | null>(null);
  const [isNewResearch, setIsNewResearch] = useState<boolean>(false);

  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [isNewSkill, setIsNewSkill] = useState<boolean>(false);

  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isNewExp, setIsNewExp] = useState<boolean>(false);

  const [editingEdu, setEditingEdu] = useState<any | null>(null);
  const [isNewEdu, setIsNewEdu] = useState<boolean>(false);

  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [isNewCert, setIsNewCert] = useState<boolean>(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<ProfileData>(profile);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const handleProfileImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'Image size must be under 10MB.');
      return;
    }

    try {
      setIsUploadingImage(true);
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const uploadRes = await adminUploadImage(base64Data, 'colliner_portrait');
          setProfileForm(prev => ({ ...prev, avatarUrl: uploadRes.url }));
          showToast('success', 'New photo uploaded! Click "Save Brand Profile" to publish.');
        } catch (err: any) {
          const base64Data = reader.result as string;
          setProfileForm(prev => ({ ...prev, avatarUrl: base64Data }));
          showToast('success', 'Photo loaded into profile! Click "Save Brand Profile" to save.');
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setIsUploadingImage(false);
      showToast('error', err.message || 'Failed to process image file');
    }
  };

  // Password Form
  const [pwdCurrent, setPwdCurrent] = useState<string>('');
  const [pwdNew, setPwdNew] = useState<string>('');
  const [pwdConfirm, setPwdConfirm] = useState<string>('');

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check auth session on mount & listen for Escape key to close
  useEffect(() => {
    const checkSession = async () => {
      const me = await adminCheckMe();
      if (me && me.user) {
        setIsAuthenticated(true);
        setAdminUser(me.user);
      }
    };
    checkSession();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Update profile form when profile changes
  useEffect(() => {
    if (profile) {
      setProfileForm(profile);
    }
  }, [profile]);

  // Load messages when on messages tab
  useEffect(() => {
    if (isAuthenticated && (activeTab === 'messages' || activeTab === 'overview')) {
      loadMessages();
    }
  }, [isAuthenticated, activeTab]);

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await adminFetchMessages();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await adminLogin(loginEmail, loginPassword);
      setIsAuthenticated(true);
      setAdminUser(res.user);
      showToast('success', 'Welcome back, Colliner! Admin mode activated.');
      refreshData();
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    authService.removeToken();
    setIsAuthenticated(false);
    setAdminUser(null);
    showToast('success', 'Logged out of admin panel.');
  };

  // ----------------------------------------------------
  // Project Actions
  // ----------------------------------------------------
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewProject) {
        await adminCreateProject(editingProject);
        showToast('success', 'Project created and saved to database!');
      } else {
        await adminUpdateProject(editingProject.dbId, editingProject);
        showToast('success', 'Project updated successfully!');
      }
      setEditingProject(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;
    try {
      await adminDeleteProject(id);
      showToast('success', 'Project deleted from database.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete project');
    }
  };

  // ----------------------------------------------------
  // Service Actions
  // ----------------------------------------------------
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewService) {
        await adminCreateService(editingService);
        showToast('success', 'Service created and saved to database!');
      } else {
        await adminUpdateService(editingService.dbId, editingService);
        showToast('success', 'Service updated successfully!');
      }
      setEditingService(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save service');
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await adminDeleteService(id);
      showToast('success', 'Service deleted.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete service');
    }
  };

  // ----------------------------------------------------
  // Research Actions
  // ----------------------------------------------------
  const handleSaveResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewResearch) {
        await adminCreateResearch(editingResearch);
        showToast('success', 'Research paper published to database!');
      } else {
        await adminUpdateResearch(editingResearch.dbId, editingResearch);
        showToast('success', 'Research paper updated!');
      }
      setEditingResearch(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save research');
    }
  };

  const handleDeleteResearch = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await adminDeleteResearch(id);
      showToast('success', 'Research article deleted.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete research');
    }
  };

  // ----------------------------------------------------
  // Skill Actions
  // ----------------------------------------------------
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewSkill) {
        await adminCreateSkill(editingSkill);
        showToast('success', 'Skill added to database!');
      } else {
        await adminUpdateSkill(editingSkill.dbId, editingSkill);
        showToast('success', 'Skill updated!');
      }
      setEditingSkill(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await adminDeleteSkill(id);
      showToast('success', 'Skill deleted.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete skill');
    }
  };

  // ----------------------------------------------------
  // Experience Actions
  // ----------------------------------------------------
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewExp) {
        await adminCreateExperience(editingExp);
        showToast('success', 'Experience role created!');
      } else {
        await adminUpdateExperience(editingExp.dbId, editingExp);
        showToast('success', 'Experience updated!');
      }
      setEditingExp(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save experience');
    }
  };

  const handleDeleteExp = async (id: number) => {
    if (!window.confirm('Delete this career record?')) return;
    try {
      await adminDeleteExperience(id);
      showToast('success', 'Experience deleted.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete experience');
    }
  };

  // ----------------------------------------------------
  // Education & Certification Actions
  // ----------------------------------------------------
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewEdu) {
        await adminCreateEducation(editingEdu);
        showToast('success', 'Education record created!');
      } else {
        await adminUpdateEducation(editingEdu.dbId, editingEdu);
        showToast('success', 'Education updated!');
      }
      setEditingEdu(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save education');
    }
  };

  const handleDeleteEdu = async (id: number) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await adminDeleteEducation(id);
      showToast('success', 'Education record removed.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete education');
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewCert) {
        await adminCreateCertification(editingCert);
        showToast('success', 'Certification created!');
      } else {
        await adminUpdateCertification(editingCert.dbId, editingCert);
        showToast('success', 'Certification updated!');
      }
      setEditingCert(null);
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save certification');
    }
  };

  const handleDeleteCert = async (id: number) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await adminDeleteCertification(id);
      showToast('success', 'Certification removed.');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete certification');
    }
  };

  // ----------------------------------------------------
  // Profile Update
  // ----------------------------------------------------
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminUpdateProfile(profileForm);
      showToast('success', 'Brand and profile settings updated in database!');
      await refreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update profile');
    }
  };

  // ----------------------------------------------------
  // Message Actions
  // ----------------------------------------------------
  const handleMarkRead = async (id: number) => {
    try {
      await adminMarkMessageRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      showToast('success', 'Message marked as read.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update message');
    }
  };

  const handleDeleteMsg = async (id: number) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminDeleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      showToast('success', 'Message deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete message');
    }
  };

  // ----------------------------------------------------
  // Password Change
  // ----------------------------------------------------
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdNew !== pwdConfirm) {
      showToast('error', 'New passwords do not match');
      return;
    }
    if (pwdNew.length < 6) {
      showToast('error', 'Password must be at least 6 characters');
      return;
    }
    try {
      await adminChangePassword(pwdCurrent, pwdNew);
      showToast('success', 'Admin password changed successfully!');
      setPwdCurrent('');
      setPwdNew('');
      setPwdConfirm('');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to change password');
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  if (!isOpen) return null;

  // ----------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#020817]/95 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#081B35] border border-blue-900/60 rounded-2xl shadow-2xl overflow-hidden p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-blue-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D6EFD] to-[#00D4FF] flex items-center justify-center text-white shadow-lg shadow-[#0D6EFD]/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Admin Portal</h3>
                <p className="text-xs text-[#00D4FF]">Colliner Phosta Portfolio Manager</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#020817] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-6">
            <div className="p-3 bg-[#020817]/60 rounded-lg border border-blue-900/40 flex items-center gap-2.5 text-xs text-slate-300">
              <Database className="w-4 h-4 text-[#00D4FF] shrink-0" />
              <span>Connected to <strong>Cloud SQL Relational Database</strong></span>
            </div>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/50 rounded-lg flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                placeholder="phostacolliner@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                placeholder="Enter password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#0D6EFD] to-[#0099FF] text-white font-semibold text-sm shadow-lg shadow-[#0D6EFD]/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Access Admin Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-blue-900/40 text-center">
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-[#00D4FF] transition-colors"
            >
              ← Return to public website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN ADMIN DASHBOARD INTERFACE
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-[#020817] text-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-[60] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border transition-all animate-in fade-in slide-in-from-top-4 ${
          notification.type === 'success' 
            ? 'bg-[#062419] border-emerald-500/50 text-emerald-200' 
            : 'bg-red-950/90 border-red-500/50 text-red-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#081B35] border-b border-blue-900/50 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0D6EFD] to-[#00D4FF] flex items-center justify-center text-white shadow-md">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">Admin Console</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud SQL
              </span>
            </div>
            <p className="text-xs text-slate-400">Signed in as <strong>{adminUser?.email || 'Admin'}</strong></p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refreshData()}
            className="p-2 rounded-lg bg-[#020817] border border-blue-900/40 text-slate-300 hover:text-[#00D4FF] hover:border-[#00D4FF] text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Refresh Database Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sync DB</span>
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#0D6EFD]/30"
            title="Close Admin Panel and Return to Website"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Sign out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Logout</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#020817] border border-transparent hover:border-blue-900/50 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar Navigation */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Tabs */}
        <aside className="w-64 bg-[#051329] border-r border-blue-900/40 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Management Modules
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#020817]/60 text-slate-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Services</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#020817]/60 text-slate-300">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'research'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Research Papers</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#020817]/60 text-slate-300">
                {research.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'skills'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Skills & Tech</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-[#020817]/60 text-slate-300">
                {experience.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4" />
                <span>Edu & Certs</span>
              </div>
            </button>

            <div className="pt-4 px-3 py-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Configuration & Inquiries
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'messages'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Inbox Messages</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#00D4FF] text-black">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30'
                  : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Admin Security</span>
            </button>

          </div>

          <div className="pt-4 border-t border-blue-900/40 text-xs text-slate-400">
            <p className="font-semibold text-slate-300">Database Engine</p>
            <p className="text-[11px] text-[#00D4FF]">PostgreSQL (Cloud SQL)</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#020817]">
          
          {/* ======================================================== */}
          {/* 1. OVERVIEW TAB */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Database & Content Overview</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Manage your portfolio items, research papers, services, and profile information stored in Cloud SQL.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</p>
                    <p className="text-3xl font-extrabold text-white mt-1">{projects.length}</p>
                    <button onClick={() => setActiveTab('projects')} className="text-xs text-[#00D4FF] hover:underline mt-2 inline-block">Manage projects →</button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#00D4FF]">
                    <Briefcase className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Services</p>
                    <p className="text-3xl font-extrabold text-white mt-1">{services.length}</p>
                    <button onClick={() => setActiveTab('services')} className="text-xs text-[#00D4FF] hover:underline mt-2 inline-block">Manage services →</button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Wrench className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Research Papers</p>
                    <p className="text-3xl font-extrabold text-white mt-1">{research.length}</p>
                    <button onClick={() => setActiveTab('research')} className="text-xs text-[#00D4FF] hover:underline mt-2 inline-block">Manage research →</button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Client Inquiries</p>
                    <p className="text-3xl font-extrabold text-white mt-1">{messages.length}</p>
                    <button onClick={() => setActiveTab('messages')} className="text-xs text-[#00D4FF] hover:underline mt-2 inline-block">
                      {unreadCount} unread →
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Mail className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-4">
                <h3 className="text-base font-bold text-white">Quick Content Creation</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingProject({
                        title: '',
                        category: 'Data Analytics',
                        shortDescription: '',
                        fullDescription: '',
                        problemStatement: '',
                        objectives: [''],
                        methodology: '',
                        toolsUsed: ['Power BI', 'SQL'],
                        keyFindings: [''],
                        businessImpact: '',
                        githubLink: '',
                        liveLink: '',
                        imageUrl: '',
                        featured: true,
                        sortOrder: projects.length + 1,
                      });
                      setIsNewProject(true);
                      setActiveTab('projects');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingResearch({
                        title: '',
                        category: 'Econometrics',
                        readTime: '6 min read',
                        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                        shortSummary: '',
                        abstract: '',
                        methodology: '',
                        dataset: '',
                        keyFindings: [''],
                        policyImplications: [''],
                        tags: ['Economics', 'Data'],
                        sortOrder: research.length + 1,
                      });
                      setIsNewResearch(true);
                      setActiveTab('research');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#081B35] hover:bg-[#0c2445] text-white border border-blue-900/60 text-sm font-semibold flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Research Paper</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingService({
                        title: '',
                        subtitle: 'Consulting & Analytics',
                        description: '',
                        deliverables: [''],
                        tools: ['Power BI', 'Excel'],
                        icon: 'BarChart3',
                        sortOrder: services.length + 1,
                      });
                      setIsNewService(true);
                      setActiveTab('services');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#081B35] hover:bg-[#0c2445] text-white border border-blue-900/60 text-sm font-semibold flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service Offering</span>
                  </button>
                </div>
              </div>

              {/* Database Status Details */}
              <div className="p-6 rounded-2xl bg-[#06152B] border border-blue-900/40">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#00D4FF]" />
                  <span>Cloud SQL Relational Storage Engine</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All your content is stored in Google Cloud SQL PostgreSQL database with automated transactions, relational integrity, and JWT-authenticated API endpoints. Any additions, updates, or deletions made here take effect immediately on your live website without requiring code deployments.
                </p>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 2. PROJECTS TAB */}
          {/* ======================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Portfolio Projects</h2>
                  <p className="text-sm text-slate-400">Add, edit, or remove featured projects in your portfolio.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      category: 'Data Analytics',
                      shortDescription: '',
                      fullDescription: '',
                      problemStatement: '',
                      objectives: ['Centralize transactional sales data into a cohesive star schema'],
                      methodology: '',
                      toolsUsed: ['Power BI', 'SQL', 'DAX'],
                      keyFindings: ['Identified primary drivers of operational margins'],
                      businessImpact: 'Saved weekly manual reporting hours and improved decision turnaround',
                      githubLink: 'https://github.com/phostacolliner',
                      liveLink: '',
                      imageUrl: '',
                      featured: true,
                      sortOrder: projects.length + 1,
                    });
                    setIsNewProject(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#0D6EFD]/20 text-[#00D4FF] border border-[#0D6EFD]/40">
                          {proj.category}
                        </span>
                        <h4 className="text-base font-bold text-white">{proj.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{proj.shortDescription}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-[#020817] text-slate-400 border border-blue-900/40">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingProject({
                            dbId: (proj as any).dbId,
                            title: proj.title,
                            category: proj.category,
                            shortDescription: proj.shortDescription,
                            fullDescription: proj.fullDescription,
                            problemStatement: proj.problemStatement || '',
                            objectives: proj.objectives || [],
                            methodology: proj.methodology ? proj.methodology.join('\n') : '',
                            toolsUsed: proj.toolsUsed || [],
                            keyFindings: proj.keyFindings || [],
                            businessImpact: proj.businessImpact ? proj.businessImpact.join('\n') : '',
                            githubLink: proj.githubUrl || '',
                            liveLink: proj.liveDemoUrl || '',
                            imageUrl: proj.image || '',
                            featured: proj.featured,
                            sortOrder: (proj as any).sortOrder || 0,
                          });
                          setIsNewProject(false);
                        }}
                        className="p-2 rounded-lg bg-[#020817] border border-blue-900/60 text-slate-200 hover:text-[#00D4FF] hover:border-[#00D4FF] transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          const dbId = (proj as any).dbId;
                          if (dbId) handleDeleteProject(dbId);
                          else showToast('error', 'Project ID not found in database');
                        }}
                        className="p-2 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900/40 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Modal Form */}
              {editingProject && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-2xl bg-[#081B35] border border-blue-900/60 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                    
                    <div className="flex items-center justify-between pb-4 border-b border-blue-900/40 mb-6">
                      <h3 className="text-lg font-bold text-white">
                        {isNewProject ? 'Create New Project' : 'Edit Project Details'}
                      </h3>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Project Title</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                            placeholder="e.g. Sales & Profitability Dashboard"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          >
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Finance">Finance</option>
                            <option value="Economics">Economics</option>
                            <option value="Research">Research</option>
                            <option value="Web Development">Web Development</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Short Description (Card Overview)</label>
                        <input
                          type="text"
                          required
                          value={editingProject.shortDescription}
                          onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="Brief 1-line overview for the portfolio card"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Description (Case Study)</label>
                        <textarea
                          rows={3}
                          value={editingProject.fullDescription}
                          onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="Detailed description of the analytical solution..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Problem Statement</label>
                        <textarea
                          rows={2}
                          value={editingProject.problemStatement}
                          onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="What business problem or inefficiency did this solve?"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Methodology & Architecture</label>
                        <textarea
                          rows={2}
                          value={editingProject.methodology}
                          onChange={(e) => setEditingProject({ ...editingProject, methodology: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="Data pipeline, ETL, star schema, DAX measures, econometrics..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Tools & Technologies (Comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingProject.toolsUsed) ? editingProject.toolsUsed.join(', ') : editingProject.toolsUsed}
                          onChange={(e) => setEditingProject({ ...editingProject, toolsUsed: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="Power BI, SQL, DAX, Excel, Python"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Business Impact & Outcomes</label>
                        <textarea
                          rows={2}
                          value={editingProject.businessImpact}
                          onChange={(e) => setEditingProject({ ...editingProject, businessImpact: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                          placeholder="Measurable business results (e.g. 35 hrs saved/week, +4.2% margin)"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GitHub / Code URL</label>
                          <input
                            type="text"
                            value={editingProject.githubLink}
                            onChange={(e) => setEditingProject({ ...editingProject, githubLink: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                            placeholder="https://github.com/phostacolliner/..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Live Demo / Dashboard URL</label>
                          <input
                            type="text"
                            value={editingProject.liveLink}
                            onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                            placeholder="https://app.powerbi.com/..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-blue-900/40">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#0099FF] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Project to Cloud SQL</span>
                        </button>
                      </div>

                    </form>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 3. SERVICES TAB */}
          {/* ======================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Services & Offerings</h2>
                  <p className="text-sm text-slate-400">Configure what consulting and technical services you provide.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingService({
                      title: '',
                      subtitle: 'Analytics & Consulting',
                      description: '',
                      deliverables: ['KPI Dashboards', 'Data Modeling', 'Executive Reporting'],
                      tools: ['Power BI', 'SQL', 'Excel'],
                      icon: 'BarChart3',
                      sortOrder: services.length + 1,
                    });
                    setIsNewService(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-wider">{srv.category}</span>
                        <h4 className="text-base font-bold text-white">{srv.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingService({
                              dbId: (srv as any).dbId,
                              title: srv.title,
                              subtitle: srv.category,
                              description: srv.description,
                              deliverables: srv.deliverables,
                              tools: srv.tools,
                              icon: srv.iconName || 'BarChart3',
                              sortOrder: (srv as any).sortOrder || 0,
                            });
                            setIsNewService(false);
                          }}
                          className="p-1.5 rounded bg-[#020817] border border-blue-900/50 text-slate-300 hover:text-[#00D4FF]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const id = (srv as any).dbId;
                            if (id) handleDeleteService(id);
                          }}
                          className="p-1.5 rounded bg-red-950/40 border border-red-900/50 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">{srv.description}</p>
                    <div className="pt-2 border-t border-blue-900/30">
                      <p className="text-[11px] font-semibold text-slate-400 mb-1">Deliverables:</p>
                      <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                        {srv.deliverables.slice(0, 3).map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="w-full max-w-lg bg-[#081B35] border border-blue-900/60 rounded-2xl shadow-2xl p-6">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
                      <h3 className="text-base font-bold text-white">{isNewService ? 'Add Service' : 'Edit Service'}</h3>
                      <button onClick={() => setEditingService(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveService} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                        <input
                          type="text"
                          required
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Category</label>
                        <input
                          type="text"
                          value={editingService.subtitle}
                          onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Deliverables (Comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingService.deliverables) ? editingService.deliverables.join(', ') : editingService.deliverables}
                          onChange={(e) => setEditingService({ ...editingService, deliverables: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Tools (Comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(editingService.tools) ? editingService.tools.join(', ') : editingService.tools}
                          onChange={(e) => setEditingService({ ...editingService, tools: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingService(null)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg text-xs font-semibold">Save Service</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 4. RESEARCH TAB */}
          {/* ======================================================== */}
          {activeTab === 'research' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Research & Publications</h2>
                  <p className="text-sm text-slate-400">Manage your published economic research papers and policy briefs.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingResearch({
                      title: '',
                      category: 'Econometrics',
                      readTime: '7 min read',
                      date: 'August 2024',
                      shortSummary: '',
                      abstract: '',
                      methodology: '',
                      dataset: '',
                      keyFindings: ['Empirical findings summary'],
                      policyImplications: ['Policy recommendation'],
                      tags: ['Econometrics', 'Time Series'],
                      sortOrder: research.length + 1,
                    });
                    setIsNewResearch(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Paper</span>
                </button>
              </div>

              <div className="space-y-3">
                {research.map((paper) => (
                  <div key={paper.id} className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/40">
                          {paper.category}
                        </span>
                        <span className="text-xs text-slate-400">{paper.date} • {paper.readTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{paper.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{paper.shortSummary}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingResearch({
                            dbId: (paper as any).dbId,
                            title: paper.title,
                            category: paper.category,
                            readTime: paper.readTime,
                            date: paper.date,
                            shortSummary: paper.shortSummary,
                            abstract: paper.abstract,
                            methodology: paper.methodology,
                            dataset: paper.dataset,
                            keyFindings: paper.keyFindings,
                            policyImplications: paper.policyImplications,
                            tags: paper.tags,
                            sortOrder: (paper as any).sortOrder || 0,
                          });
                          setIsNewResearch(false);
                        }}
                        className="p-2 rounded-lg bg-[#020817] border border-blue-900/60 text-slate-200 hover:text-[#00D4FF]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const id = (paper as any).dbId;
                          if (id) handleDeleteResearch(id);
                        }}
                        className="p-2 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Modal */}
              {editingResearch && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                  <div className="w-full max-w-2xl bg-[#081B35] border border-blue-900/60 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-blue-900/40 mb-6">
                      <h3 className="text-lg font-bold text-white">{isNewResearch ? 'Publish Research Paper' : 'Edit Research Paper'}</h3>
                      <button onClick={() => setEditingResearch(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveResearch} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Paper Title</label>
                        <input
                          type="text"
                          required
                          value={editingResearch.title}
                          onChange={(e) => setEditingResearch({ ...editingResearch, title: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Category</label>
                          <input
                            type="text"
                            value={editingResearch.category}
                            onChange={(e) => setEditingResearch({ ...editingResearch, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Date</label>
                          <input
                            type="text"
                            value={editingResearch.date}
                            onChange={(e) => setEditingResearch({ ...editingResearch, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Read Time</label>
                          <input
                            type="text"
                            value={editingResearch.readTime}
                            onChange={(e) => setEditingResearch({ ...editingResearch, readTime: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Short Summary</label>
                        <input
                          type="text"
                          value={editingResearch.shortSummary}
                          onChange={(e) => setEditingResearch({ ...editingResearch, shortSummary: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Abstract</label>
                        <textarea
                          rows={3}
                          value={editingResearch.abstract}
                          onChange={(e) => setEditingResearch({ ...editingResearch, abstract: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Methodology</label>
                        <textarea
                          rows={2}
                          value={editingResearch.methodology}
                          onChange={(e) => setEditingResearch({ ...editingResearch, methodology: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Dataset Sources</label>
                        <input
                          type="text"
                          value={editingResearch.dataset}
                          onChange={(e) => setEditingResearch({ ...editingResearch, dataset: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingResearch(null)} className="px-4 py-2 text-slate-400">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-[#0D6EFD] text-white rounded-lg font-semibold text-sm">Save Research</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 5. SKILLS TAB */}
          {/* ======================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Technical Skills & Proficiencies</h2>
                  <p className="text-sm text-slate-400">Manage your skills and proficiency percentage levels.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSkill({
                      category: 'ANALYTICS',
                      name: '',
                      level: 90,
                      experience: 'Advanced level proficiency',
                      sortOrder: 1,
                    });
                    setIsNewSkill(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((cat) => (
                  <div key={cat.category} className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-3">
                    <h3 className="text-sm font-bold text-[#00D4FF] tracking-wider uppercase">{cat.category}</h3>
                    <div className="space-y-2">
                      {cat.skills.map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#020817]/70 border border-blue-900/40">
                          <div>
                            <span className="text-sm font-semibold text-white">{s.name}</span>
                            <p className="text-[11px] text-slate-400">{s.experience}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#00D4FF]">{s.level}%</span>
                            <button
                              onClick={() => {
                                setEditingSkill({
                                  dbId: (s as any).dbId,
                                  category: cat.category,
                                  name: s.name,
                                  level: s.level,
                                  experience: s.experience,
                                  sortOrder: idx + 1,
                                });
                                setIsNewSkill(false);
                              }}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                const id = (s as any).dbId;
                                if (id) handleDeleteSkill(id);
                              }}
                              className="p-1 text-red-400 hover:text-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Modal */}
              {editingSkill && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-[#081B35] border border-blue-900/60 rounded-2xl p-6">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
                      <h3 className="text-base font-bold text-white">{isNewSkill ? 'Add Skill' : 'Edit Skill'}</h3>
                      <button onClick={() => setEditingSkill(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveSkill} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                        <select
                          value={editingSkill.category}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        >
                          <option value="ANALYTICS">ANALYTICS</option>
                          <option value="ECONOMICS">ECONOMICS</option>
                          <option value="FINANCE">FINANCE</option>
                          <option value="RESEARCH">RESEARCH</option>
                          <option value="TECHNOLOGY">TECHNOLOGY</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          placeholder="e.g. Power BI"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency Level ({editingSkill.level}%)</label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={editingSkill.level}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                          className="w-full accent-[#00D4FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Note / Subtitle</label>
                        <input
                          type="text"
                          value={editingSkill.experience}
                          onChange={(e) => setEditingSkill({ ...editingSkill, experience: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          placeholder="e.g. Advanced DAX, Star Schema Modeling"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingSkill(null)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg text-xs font-semibold">Save Skill</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 6. EXPERIENCE TAB */}
          {/* ======================================================== */}
          {activeTab === 'experience' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Experience & Career Roles</h2>
                  <p className="text-sm text-slate-400">Manage your employment history and consulting engagements.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExp({
                      role: '',
                      organization: '',
                      location: 'Nairobi, Kenya',
                      period: '2024 – Present',
                      category: 'Analytics',
                      responsibilities: ['Engineered reporting solutions and KPI frameworks'],
                      toolsUsed: ['Power BI', 'SQL', 'Excel'],
                      sortOrder: experience.length + 1,
                    });
                    setIsNewExp(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-[#00D4FF] font-semibold">{item.period} • {item.location}</span>
                        <h4 className="text-base font-bold text-white">{item.role}</h4>
                        <p className="text-xs font-medium text-slate-300">{item.organization}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingExp({
                              dbId: (item as any).dbId,
                              role: item.role,
                              organization: item.organization,
                              location: item.location,
                              period: item.period,
                              category: item.category,
                              responsibilities: item.responsibilities,
                              toolsUsed: item.toolsUsed,
                              sortOrder: (item as any).sortOrder || 0,
                            });
                            setIsNewExp(false);
                          }}
                          className="p-1.5 rounded bg-[#020817] border border-blue-900/50 text-slate-300 hover:text-[#00D4FF]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const id = (item as any).dbId;
                            if (id) handleDeleteExp(id);
                          }}
                          className="p-1.5 rounded bg-red-950/40 border border-red-900/50 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {item.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Exp Modal */}
              {editingExp && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="w-full max-w-lg bg-[#081B35] border border-blue-900/60 rounded-2xl p-6">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
                      <h3 className="text-base font-bold text-white">{isNewExp ? 'Add Experience Role' : 'Edit Experience'}</h3>
                      <button onClick={() => setEditingExp(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveExp} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title / Role</label>
                        <input
                          type="text"
                          required
                          value={editingExp.role}
                          onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                          <input
                            type="text"
                            required
                            value={editingExp.organization}
                            onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Period (e.g. 2023 – Present)</label>
                          <input
                            type="text"
                            required
                            value={editingExp.period}
                            onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Responsibilities (One per line or comma)</label>
                        <textarea
                          rows={3}
                          value={Array.isArray(editingExp.responsibilities) ? editingExp.responsibilities.join('\n') : editingExp.responsibilities}
                          onChange={(e) => setEditingExp({ ...editingExp, responsibilities: e.target.value.split('\n').filter(Boolean) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingExp(null)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg text-xs font-semibold">Save Role</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 7. EDUCATION & CERTS TAB */}
          {/* ======================================================== */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Education & Certifications</h2>
                <p className="text-sm text-slate-400">Manage university degrees and professional certifications.</p>
              </div>

              {/* Degrees */}
              <div className="p-6 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Academic Degrees</h3>
                  <button
                    onClick={() => {
                      setEditingEdu({
                        degree: "Bachelor's Degree in Economics and Statistics",
                        institution: 'Kirinyaga University',
                        location: 'Kirinyaga / Nairobi, Kenya',
                        period: '2020 – 2024',
                        description: 'Rigorous quantitative and economics curriculum.',
                        coreCourses: ['Econometrics', 'Statistics', 'Financial Economics'],
                        sortOrder: education.length + 1,
                      });
                      setIsNewEdu(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#020817]/70 border border-blue-900/40 flex items-start justify-between">
                      <div>
                        <span className="text-xs text-[#00D4FF] font-semibold">{edu.period} • {edu.location}</span>
                        <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                        <p className="text-xs text-slate-300">{edu.institution}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingEdu({
                              dbId: (edu as any).dbId,
                              degree: edu.degree,
                              institution: edu.institution,
                              location: edu.location,
                              period: edu.period,
                              description: edu.description,
                              coreCourses: edu.coreCourses,
                              sortOrder: (edu as any).sortOrder || 0,
                            });
                            setIsNewEdu(false);
                          }}
                          className="p-1.5 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const id = (edu as any).dbId;
                            if (id) handleDeleteEdu(id);
                          }}
                          className="p-1.5 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="p-6 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Professional Certifications</h3>
                  <button
                    onClick={() => {
                      setEditingCert({
                        name: 'Power BI Data Analyst Associate',
                        issuer: 'Microsoft',
                        year: '2024',
                        topics: ['DAX', 'Power Query', 'Data Modeling'],
                        credentialUrl: '',
                        sortOrder: certifications.length + 1,
                      });
                      setIsNewCert(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#020817]/70 border border-blue-900/40 flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[#00D4FF] font-bold">{cert.issuer} • {cert.year}</span>
                        <h4 className="text-xs font-bold text-white">{cert.name}</h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCert({
                              dbId: (cert as any).dbId,
                              name: cert.name,
                              issuer: cert.issuer,
                              year: cert.year,
                              topics: cert.topics,
                              credentialUrl: cert.credentialUrl || '',
                              sortOrder: (cert as any).sortOrder || 0,
                            });
                            setIsNewCert(false);
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const id = (cert as any).dbId;
                            if (id) handleDeleteCert(id);
                          }}
                          className="p-1 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edu Modal */}
              {editingEdu && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-[#081B35] border border-blue-900/60 rounded-2xl p-6">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
                      <h3 className="text-base font-bold text-white">{isNewEdu ? 'Add Degree' : 'Edit Degree'}</h3>
                      <button onClick={() => setEditingEdu(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveEdu} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.degree}
                          onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Institution</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.institution}
                          onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Period (e.g. 2020 – 2024)</label>
                        <input
                          type="text"
                          required
                          value={editingEdu.period}
                          onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingEdu(null)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg text-xs font-semibold">Save Degree</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Cert Modal */}
              {editingCert && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-[#081B35] border border-blue-900/60 rounded-2xl p-6">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/40 mb-4">
                      <h3 className="text-base font-bold text-white">{isNewCert ? 'Add Certification' : 'Edit Certification'}</h3>
                      <button onClick={() => setEditingCert(null)}><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <form onSubmit={handleSaveCert} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Certification Name</label>
                        <input
                          type="text"
                          required
                          value={editingCert.name}
                          onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer</label>
                          <input
                            type="text"
                            required
                            value={editingCert.issuer}
                            onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
                          <input
                            type="text"
                            required
                            value={editingCert.year}
                            onChange={(e) => setEditingCert({ ...editingCert, year: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-blue-900/40">
                        <button type="button" onClick={() => setEditingCert(null)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg text-xs font-semibold">Save Certification</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 8. PROFILE & HERO TAB */}
          {/* ======================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Brand & Profile Settings</h2>
                <p className="text-sm text-slate-400">Update your profile picture, hero headline, biography, phone number, email, and social links in the database.</p>
              </div>

              {/* Profile Picture / Hero Portrait Management */}
              <div className="p-6 md:p-8 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-blue-900/40">
                  <Camera className="w-5 h-5 text-[#00D4FF]" />
                  <h3 className="text-base font-bold text-white">Home Page Profile Picture</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Photo Preview */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="relative w-44 aspect-[4/5] rounded-xl p-1 bg-gradient-to-b from-[#00D4FF]/40 to-transparent border border-blue-500/30 overflow-hidden shadow-xl shadow-black/60 group">
                      <img
                        src={profileForm.avatarUrl || defaultPortraitImg}
                        alt="Profile Preview"
                        className="w-full h-full object-cover object-top rounded-lg bg-[#020817]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultPortraitImg;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-semibold text-white bg-black/70 px-2.5 py-1 rounded-full border border-blue-400/40">
                          Live Preview
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 mt-2 text-center">Hero Section Portrait</span>
                  </div>

                  {/* Upload & Controls */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                        Upload New Photo From Device
                      </label>
                      <label className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        isUploadingImage 
                          ? 'border-[#00D4FF] bg-[#00D4FF]/10' 
                          : 'border-blue-900/70 bg-[#020817]/60 hover:bg-[#020817] hover:border-[#00D4FF]/50'
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfileImageFileChange}
                          disabled={isUploadingImage}
                        />
                        {isUploadingImage ? (
                          <div className="flex items-center gap-2 text-sm text-[#00D4FF]">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Processing & uploading image...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center">
                            <Upload className="w-7 h-7 text-[#00D4FF] mb-2" />
                            <span className="text-sm font-semibold text-white">Click or drag & drop a new photo here</span>
                            <span className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP (up to 10MB)</span>
                          </div>
                        )}
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Or Provide Image URL / Asset Path
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. /uploads/portrait.jpg or https://images.unsplash.com/..."
                          value={profileForm.avatarUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                        />
                        {profileForm.avatarUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfileForm({ ...profileForm, avatarUrl: '' });
                              showToast('success', 'Reset to default studio portrait.');
                            }}
                            title="Reset to Default Portrait"
                            className="px-3 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-slate-300 hover:text-white hover:border-red-500/50 flex items-center gap-1.5 text-xs whitespace-nowrap"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 md:p-8 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Professional Title</label>
                    <input
                      type="text"
                      required
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Hero Tagline</label>
                  <input
                    type="text"
                    required
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Twitter URL</label>
                    <input
                      type="text"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Projects Count KPI</label>
                    <input
                      type="number"
                      value={profileForm.kpiProjectsCount}
                      onChange={(e) => setProfileForm({ ...profileForm, kpiProjectsCount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Years Experience KPI</label>
                    <input
                      type="number"
                      value={profileForm.kpiYearsExp}
                      onChange={(e) => setProfileForm({ ...profileForm, kpiYearsExp: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Satisfaction % KPI</label>
                    <input
                      type="number"
                      value={profileForm.kpiSatisfaction}
                      onChange={(e) => setProfileForm({ ...profileForm, kpiSatisfaction: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-900/40 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#0D6EFD]/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Brand Profile to Cloud SQL</span>
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ======================================================== */}
          {/* 9. MESSAGES INBOX TAB */}
          {/* ======================================================== */}
          {activeTab === 'messages' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Contact Inquiries Inbox</h2>
                  <p className="text-sm text-slate-400">Real-time inquiries and project requests submitted by visitors.</p>
                </div>
                <button
                  onClick={loadMessages}
                  className="px-3 py-1.5 rounded-lg bg-[#081B35] border border-blue-900/50 text-slate-300 hover:text-[#00D4FF] text-xs font-medium flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#081B35] border border-blue-900/50 text-center space-y-3">
                  <Mail className="w-12 h-12 text-slate-500 mx-auto" />
                  <h4 className="text-base font-bold text-white">No inquiries yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    When visitors submit the contact form on your portfolio website, their messages will arrive here in real-time.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.isRead 
                          ? 'bg-[#081B35]/60 border-blue-900/30 text-slate-300' 
                          : 'bg-[#081B35] border-[#00D4FF]/40 text-white shadow-md'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-blue-900/30">
                        <div className="flex items-center gap-2.5">
                          {!msg.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                          )}
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className="text-xs text-[#00D4FF] font-medium">&lt;{msg.email}&gt;</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>{new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          
                          {!msg.isRead && (
                            <button
                              onClick={() => handleMarkRead(msg.id)}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0D6EFD]/20 text-[#00D4FF] hover:bg-[#0D6EFD] hover:text-white"
                            >
                              Mark Read
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteMsg(msg.id)}
                            className="p-1 rounded text-red-400 hover:text-red-200"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-3">
                        <p className="text-xs font-bold text-slate-200 mb-1">Subject: {msg.subject}</p>
                        <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                      </div>

                      <div className="pt-3 flex gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-3 py-1 rounded bg-[#0D6EFD]/20 border border-[#0D6EFD]/40 text-[#00D4FF] hover:bg-[#0D6EFD] hover:text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ======================================================== */}
          {/* 10. SECURITY TAB */}
          {/* ======================================================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Admin Security & Credentials</h2>
                <p className="text-sm text-slate-400">Change your administrative dashboard access password.</p>
              </div>

              <form onSubmit={handleChangePassword} className="p-6 md:p-8 rounded-2xl bg-[#081B35] border border-blue-900/50 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Current Password</label>
                  <input
                    type="password"
                    value={pwdCurrent}
                    onChange={(e) => setPwdCurrent(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    placeholder="Enter current password (default: admin12345)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={pwdNew}
                    onChange={(e) => setPwdNew(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    placeholder="Enter new password (min 6 chars)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={pwdConfirm}
                    onChange={(e) => setPwdConfirm(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#020817] border border-blue-900/60 text-white text-sm focus:border-[#00D4FF] focus:outline-none"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#0099FF] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D6EFD]/30 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Update Admin Password</span>
                  </button>
                </div>
              </form>

            </div>
          )}

        </main>

      </div>

    </div>
  );
};
