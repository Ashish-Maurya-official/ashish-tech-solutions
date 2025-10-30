import { useState, useRef, useEffect } from 'react';
import { getTemplate } from '../templates';

// Inline editable text component
function InlineEdit({ value, onChange, placeholder, multiline = false, className = '' }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (!multiline) {
                inputRef.current.select();
            }
        }
    }, [isEditing, multiline]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e) => {
        if (!multiline && e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return multiline ? (
            <textarea
                ref={inputRef}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`inline-edit-input ${className}`}
                placeholder={placeholder}
                rows={4}
            />
        ) : (
            <input
                ref={inputRef}
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`inline-edit-input ${className}`}
                placeholder={placeholder}
            />
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={`inline-edit-display ${className} ${!value ? 'empty' : ''}`}
            title="Click to edit"
        >
            {value || placeholder}
        </span>
    );
}

export default function InlineEditableResume({ templateId, data, updateField, updateHeading, forPrint = false }) {
    const template = getTemplate(templateId);
    const TemplateComponent = template.component;

    // Create editable version of data
    const editableData = {
        ...data,
        // Editable headings
        headings: data.headings ? {
            summary: (
                <InlineEdit
                    value={data.headings.summary}
                    onChange={(val) => updateHeading('summary', val)}
                    placeholder="Summary"
                    className="editable-heading"
                />
            ),
            experience: (
                <InlineEdit
                    value={data.headings.experience}
                    onChange={(val) => updateHeading('experience', val)}
                    placeholder="Work Experience"
                    className="editable-heading"
                />
            ),
            education: (
                <InlineEdit
                    value={data.headings.education}
                    onChange={(val) => updateHeading('education', val)}
                    placeholder="Education"
                    className="editable-heading"
                />
            ),
            skills: (
                <InlineEdit
                    value={data.headings.skills}
                    onChange={(val) => updateHeading('skills', val)}
                    placeholder="Skills"
                    className="editable-heading"
                />
            ),
            projects: (
                <InlineEdit
                    value={data.headings.projects}
                    onChange={(val) => updateHeading('projects', val)}
                    placeholder="Projects"
                    className="editable-heading"
                />
            ),
            languages: (
                <InlineEdit
                    value={data.headings.languages}
                    onChange={(val) => updateHeading('languages', val)}
                    placeholder="Languages"
                    className="editable-heading"
                />
            )
        } : data.headings,
        name: (
            <InlineEdit
                value={data.name}
                onChange={(val) => updateField('name', val)}
                placeholder="Your Name"
                className="editable-name"
            />
        ),
        title: (
            <InlineEdit
                value={data.title}
                onChange={(val) => updateField('title', val)}
                placeholder="Your Title"
                className="editable-title"
            />
        ),
        email: (
            <InlineEdit
                value={data.email}
                onChange={(val) => updateField('email', val)}
                placeholder="email@example.com"
                className="editable-contact"
            />
        ),
        phone: (
            <InlineEdit
                value={data.phone}
                onChange={(val) => updateField('phone', val)}
                placeholder="+1 (555) 123-4567"
                className="editable-contact"
            />
        ),
        location: (
            <InlineEdit
                value={data.location}
                onChange={(val) => updateField('location', val)}
                placeholder="City, State"
                className="editable-contact"
            />
        ),
        summary: (
            <InlineEdit
                value={data.summary}
                onChange={(val) => updateField('summary', val)}
                placeholder="Professional summary..."
                multiline
                className="editable-summary"
            />
        ),
        experience: data.experience.map((exp, index) => ({
            role: (
                <InlineEdit
                    value={exp.role}
                    onChange={(val) => updateField(`experience.${index}.role`, val)}
                    placeholder="Job Title"
                    className="editable-role"
                />
            ),
            company: (
                <InlineEdit
                    value={exp.company}
                    onChange={(val) => updateField(`experience.${index}.company`, val)}
                    placeholder="Company Name"
                    className="editable-company"
                />
            ),
            years: (
                <InlineEdit
                    value={exp.years}
                    onChange={(val) => updateField(`experience.${index}.years`, val)}
                    placeholder="2020 - Present"
                    className="editable-years"
                />
            ),
            description: (
                <InlineEdit
                    value={exp.description}
                    onChange={(val) => updateField(`experience.${index}.description`, val)}
                    placeholder="Job description..."
                    multiline
                    className="editable-description"
                />
            )
        })),
        education: data.education.map((edu, index) => ({
            degree: (
                <InlineEdit
                    value={edu.degree}
                    onChange={(val) => updateField(`education.${index}.degree`, val)}
                    placeholder="Degree"
                    className="editable-degree"
                />
            ),
            school: (
                <InlineEdit
                    value={edu.school}
                    onChange={(val) => updateField(`education.${index}.school`, val)}
                    placeholder="School Name"
                    className="editable-school"
                />
            ),
            years: (
                <InlineEdit
                    value={edu.years}
                    onChange={(val) => updateField(`education.${index}.years`, val)}
                    placeholder="2015 - 2019"
                    className="editable-years"
                />
            )
        })),
        skills: (data.skills || []).map((skill, index) => (
            <InlineEdit
                key={index}
                value={skill}
                onChange={(val) => updateField(`skills.${index}`, val)}
                placeholder="Skill"
                className="editable-skill"
            />
        )),
        projects: data.projects || [],
        languages: data.languages || []
    };

    return (
        <div className={`resume-preview-wrapper ${forPrint ? 'for-print' : ''} inline-editable`}>
            <div className="resume-page a4-page" data-template={templateId}>
                <TemplateComponent data={forPrint ? data : editableData} />
            </div>
        </div>
    );
}
