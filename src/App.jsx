import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, CheckCircle, Users, Target, Calendar, Activity, Download, Monitor, Info, Clock, Calculator, X, ChevronDown, ChevronRight } from 'lucide-react';

const GenAIDashboard = () => {
  const reportConfig = {
    reportDate: 'September 26, 2025',
    weekNumber: 'Week 0926',
    overallStatus: 'On Track',
    reportOutDate: 'October 10, 2025'
  };

  const calculationMethods = {
    automationSavings: {
      title: 'Automation Savings Calculation',
      description: 'Time reduction achieved through automated processes vs manual execution',
      formula: '((Manual Time - Automated Time) / Manual Time) × 100',
      dataPoints: [
        'Baseline manual execution time per task',
        'Automated execution time per task',
        'Number of tasks automated',
        'Frequency of task execution'
      ],
      example: 'Manual test case creation: 2 hours → Copilot-assisted: 1.6 hours = 20% savings',
      measurementPeriod: 'Weekly measurement over 4-week rolling average',
      accuracy: '±2% margin of error based on task complexity variance'
    },
    manualSavings: {
      title: 'Manual Task Optimization Calculation',
      description: 'Efficiency improvements in manual processes using AI assistance',
      formula: '((Baseline Time - Optimized Time) / Baseline Time) × 100',
      dataPoints: [
        'Pre-implementation task completion time',
        'Post-implementation task completion time',
        'Quality metrics (error reduction)',
        'User productivity scores'
      ],
      example: 'Manual test documentation: 3 hours → AI-assisted: 2.4 hours = 20% savings',
      measurementPeriod: 'Bi-weekly assessment with peer validation',
      accuracy: '±3% margin considering learning curve effects'
    },
    coverageMetrics: {
      title: 'Coverage Calculation',
      description: 'Percentage of project scope covered by AI-assisted processes',
      formula: '(AI-Assisted Tasks / Total Project Tasks) × 100',
      dataPoints: [
        'Total number of project deliverables',
        'Number of AI-assisted deliverables',
        'Complexity weighting factors',
        'Quality validation scores'
      ],
      example: '21 AI-assisted test cases out of 25 total planned = 84% coverage',
      measurementPeriod: 'Continuous tracking with sprint-end validation',
      accuracy: '±5% based on scope changes and complexity adjustments'
    }
  };

  const projectsData = [
    {
      id: 'gwpc-r15-dm',
      name: 'GWPC R15 DM',
      status: 'On Track',
      autoSavings: 20,
      manualSavings: 0,
      coverage: '21 test cases, 18 methods',
      lead: 'Krishna',
      nextMilestone: 'Share Measurement & Reporting',
      description: 'Direct Market project with strong automation coverage',
      keyAchievements: ['20% automation time-effort savings', '21 test cases implemented', '18 common methods developed'],
      challenges: ['Complex requirements analysis taking longer than expected'],
      sprintFocus: 'SDLC prompt usage and outcome measurement'
    },
    {
      id: 'pega-referral',
      name: 'PEGA Referral',
      status: 'On Track',
      autoSavings: 25,
      manualSavings: 20,
      coverage: '8 test cases, 3 methods, 1 story card',
      lead: 'Anil',
      nextMilestone: 'Sprint 2 comparison report',
      description: 'Highest performing project with dual automation and manual savings',
      keyAchievements: ['25% automation savings achieved', '20% manual task reduction', 'Strong team adoption'],
      challenges: [],
      sprintFocus: 'Productivity uplift tracking and comparison reporting'
    },
    {
      id: 'pega-mybook',
      name: 'PEGA MyBook',
      status: 'On Track',
      autoSavings: 15,
      manualSavings: 0,
      coverage: '70-80% accuracy for debugging',
      lead: 'Team Lead',
      nextMilestone: 'Sprint 3 comparison data',
      description: 'Focus on debugging and method enhancement with high accuracy',
      keyAchievements: ['15% automation savings', '70-80% Copilot accuracy for debugging', 'Strong method understanding'],
      challenges: ['Prompt engineering optimization ongoing'],
      sprintFocus: 'Enhanced prompt engineering and QA continuation'
    },
    {
      id: 'pega-es',
      name: 'PEGA E&S',
      status: 'On Track',
      autoSavings: 0,
      manualSavings: 20,
      coverage: '14 test cases, 80-90% coverage',
      lead: 'Team Lead',
      nextMilestone: 'Finalize metrics collection',
      description: 'Strong manual process improvements with high coverage',
      keyAchievements: ['20% manual savings', '14 test cases generated', '80-90% coverage achieved'],
      challenges: [],
      sprintFocus: 'Wider QA use case execution and metrics finalization'
    },
    {
      id: 'finance-remod',
      name: 'Finance IT ReMod',
      status: 'On Track',
      autoSavings: 0,
      manualSavings: 0,
      coverage: '60% SQL logic coverage',
      lead: 'Team Lead',
      nextMilestone: 'Prompt accuracy measurement',
      description: 'Complex ETL and SQL validation scenarios with good foundational progress',
      keyAchievements: ['60% SQL logic coverage achieved', 'Strong contextual relevance in prompts', 'DDL workaround implemented'],
      challenges: ['PDF/Excel input limitations requiring workarounds'],
      sprintFocus: 'Prompt accuracy measurement and library refinement'
    }
  ];

  const sprintsData = [
    { name: 'Sprint 0', status: 'Completed', endDate: 'Jul 28', phase: 'Kick off & Onboarding' },
    { name: 'Sprint 1', status: 'Completed', endDate: 'Aug 25', phase: 'Execution with GenAI' },
    { name: 'Sprint 2', status: 'Completed', endDate: 'Sep 12', phase: 'Execution with GenAI' },
    { name: 'Sprint 3', status: 'In Progress', endDate: 'Sep 19', phase: 'Execution with GenAI' },
    { name: 'Sprint 4', status: 'Planned', endDate: 'Oct 6', phase: 'Report Out' }
  ];

  const [selectedView, setSelectedView] = useState('executive');
  const [isExporting, setIsExporting] = useState(false);
  const [showCalculationMethods, setShowCalculationMethods] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Calculate chart data
  const savingsData = projectsData.map(p => ({
    name: p.name.replace(/PEGA\s+/g, '').replace(/\s+/g, ' ').trim(),
    automation: p.autoSavings,
    manual: p.manualSavings
  }));

  const overallMetrics = {
    avgAutoSavings: Math.round(savingsData.reduce((acc, p) => acc + p.automation, 0) / savingsData.filter(p => p.automation > 0).length) || 0,
    avgManualSavings: Math.round(savingsData.reduce((acc, p) => acc + p.manual, 0) / savingsData.filter(p => p.manual > 0).length) || 0,
    projectsOnTrack: projectsData.filter(p => p.status === 'On Track').length,
    totalProjects: projectsData.length,
    completedSprints: sprintsData.filter(s => s.status === 'Completed').length,
    currentSprint: sprintsData.find(s => s.status === 'In Progress')?.name || 'N/A'
  };

  const exportToPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 100);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Completed': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'In Progress': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Planned': return 'text-slate-700 bg-slate-50 border-slate-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  // Calculation Methods Modal
  const CalculationMethodsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl max-h-96 overflow-y-auto">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Calculation Methodologies</h2>
          <button
            onClick={() => setShowCalculationMethods(false)}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(calculationMethods).map(([key, method]) => (
            <div key={key} className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">{method.title}</h3>
              <p className="text-slate-600 mb-3">{method.description}</p>

              <div className="bg-slate-50 p-3 rounded-md mb-3">
                <div className="font-medium text-slate-900 mb-1">Formula:</div>
                <code className="text-sm font-mono text-slate-700">{method.formula}</code>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Data Points Used:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {method.dataPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Example:</h4>
                  <p className="text-sm text-emerald-700 mb-3">{method.example}</p>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div><strong>Measurement Period:</strong> {method.measurementPeriod}</div>
                    <div><strong>Accuracy:</strong> {method.accuracy}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ExecutiveSummary = () => (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Project Health</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{overallMetrics.projectsOnTrack}/{overallMetrics.totalProjects}</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                All on track
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Automation</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{overallMetrics.avgAutoSavings}%</p>
              <p className="text-sm text-slate-500 mt-1">Average savings</p>
            </div>
            <TrendingUp className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Manual Tasks</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{overallMetrics.avgManualSavings}%</p>
              <p className="text-sm text-slate-500 mt-1">Average savings</p>
            </div>
            <Users className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Sprint Progress</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{overallMetrics.completedSprints}</p>
              <p className="text-sm text-indigo-600 mt-1 flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                {overallMetrics.currentSprint} active
              </p>
            </div>
            <Target className="h-8 w-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Productivity Impact Analysis</h3>
            <p className="text-sm text-slate-600 mt-1">Automation and manual task savings by project</p>
          </div>
          <Activity className="h-5 w-5 text-slate-400" />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="automation" fill="#3b82f6" name="Automation" radius={[2, 2, 0, 0]} />
            <Bar dataKey="manual" fill="#10b981" name="Manual" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Project Status Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Project Status Overview</h3>
          <p className="text-sm text-slate-600 mt-1">Current progress and key metrics for each initiative</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectsData.map((project, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-slate-900 text-sm leading-tight">{project.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{project.coverage}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center py-2 px-3 bg-slate-50 rounded-md">
                  <div className="text-lg font-bold text-slate-900">{project.autoSavings}%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Auto</div>
                </div>
                <div className="text-center py-2 px-3 bg-slate-50 rounded-md">
                  <div className="text-lg font-bold text-slate-900">{project.manualSavings}%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Manual</div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs text-slate-500 mb-1">Lead: {project.lead}</div>
                <div className="text-xs text-slate-500">Next: {project.nextMilestone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border bg-emerald-50 border-emerald-200">
          <h4 className="font-semibold mb-2 text-emerald-900">Top Performer</h4>
          <p className="text-sm leading-relaxed text-emerald-800">PEGA Referral achieving 25% automation savings with comprehensive test coverage</p>
        </div>
        <div className="p-6 rounded-xl border bg-blue-50 border-blue-200">
          <h4 className="font-semibold mb-2 text-blue-900">Current Milestone</h4>
          <p className="text-sm leading-relaxed text-blue-800">Sprint 3 completion scheduled for September 19, 2025</p>
        </div>
        <div className="p-6 rounded-xl border bg-amber-50 border-amber-200">
          <h4 className="font-semibold mb-2 text-amber-900">Focus Area</h4>
          <p className="text-sm leading-relaxed text-amber-800">Measuring prompt accuracy and establishing reuse patterns across all projects</p>
        </div>
      </div>
    </div>
  );

  const DetailedView = () => (
    <div className="space-y-6">
      {projectsData.map((project, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200">
          <div
            className="p-5 bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-200"
            onClick={() => toggleSection(project.name)}
          >
            <div className="flex items-center space-x-3">
              {expandedSections[project.name] ?
                <ChevronDown className="h-5 w-5 text-slate-500" /> :
                <ChevronRight className="h-5 w-5 text-slate-500" />
              }
              <h3 className="font-semibold text-slate-900">{project.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-600">
              <span>Auto: {project.autoSavings}%</span>
              <span>Manual: {project.manualSavings}%</span>
            </div>
          </div>

          {expandedSections[project.name] && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Project Description</h4>
                    <p className="text-slate-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Current Coverage</h4>
                    <p className="text-slate-600">{project.coverage}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Key Achievements</h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      {project.keyAchievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-md">
                        <span className="text-slate-700">Automation Savings</span>
                        <span className="font-semibold text-slate-900">{project.autoSavings}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-md">
                        <span className="text-slate-700">Manual Task Savings</span>
                        <span className="font-semibold text-slate-900">{project.manualSavings}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Sprint Focus</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{project.sprintFocus}</p>
                  </div>

                  {project.challenges.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Challenges</h4>
                      <ul className="text-slate-600 text-sm space-y-1">
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ZNA GenAI Copilot Enablement</h1>
              <p className="text-sm text-slate-600 mt-1">{reportConfig.weekNumber} Status Report • {reportConfig.reportDate}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedView('executive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedView === 'executive'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Monitor className="h-4 w-4 inline mr-2" />
                Executive View
              </button>
              <button
                onClick={() => setSelectedView('detailed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedView === 'detailed'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Clock className="h-4 w-4 inline mr-2" />
                Detailed View
              </button>
              <button
                onClick={() => setShowCalculationMethods(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                <Calculator className="h-4 w-4 inline mr-2" />
                Calculation Methods
              </button>
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all duration-200 disabled:bg-emerald-400 disabled:cursor-not-allowed shadow-sm"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin h-4 w-4 inline mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 inline mr-2" />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3">
            {selectedView === 'executive' ? <ExecutiveSummary /> : <DetailedView />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                <h3 className="font-semibold text-slate-900">Sprint Timeline</h3>
              </div>
              <div className="space-y-4">
                {sprintsData.map((sprint, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${sprint.status === 'Completed' ? 'bg-emerald-500' :
                      sprint.status === 'In Progress' ? 'bg-indigo-500' : 'bg-slate-300'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900">{sprint.name}</span>
                        <span className="text-sm text-slate-500">{sprint.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(sprint.status)}`}>
                          {sprint.status}
                        </span>
                        <span className="text-xs text-slate-500">{sprint.phase}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Info className="h-4 w-4 mr-2 text-slate-600" />
                Data Sources
              </h3>
              <div className="text-sm text-slate-600 space-y-2">
                <div><strong>Time Tracking:</strong> JIRA work logs</div>
                <div><strong>Quality Metrics:</strong> Peer reviews</div>
                <div><strong>Validation:</strong> Team assessments</div>
                <div><strong>Accuracy:</strong> ±2-5% margin</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Calculation Methods Modal */}
      {showCalculationMethods && <CalculationMethodsModal />}
    </div>
  );
};

export default GenAIDashboard;