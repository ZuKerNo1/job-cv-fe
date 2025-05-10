import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validators';

const TinyMCEEditor = ({ control, name, initialValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: FIELD_REQUIRED_MESSAGE }}
      defaultValue={initialValue}
      render={({ field }) => (
        <Editor
          initialValue={initialValue ? initialValue : '<p></p>'}
          onEditorChange={(content) => {
            field.onChange(content);
          }}
          apiKey="4pdu3o8hr47irdlydrju5z4ccixwdtpig41utsxfhcdt4uqo"
          init={{
            browser_spellcheck: false,
            contextmenu: false,
            forced_root_block: false,
            language: 'vi',
            language_url: 'https://cdn.tiny.cloud/1/no-api-key/tinymce/6/langs/vi.js',
            plugins: [
              'anchor',
              'autolink',
              'charmap',
              'codesample',
              'emoticons',
              'image',
              'link',
              'lists',
              'media',
              'searchreplace',
              'table',
              'visualblocks',
              'wordcount'
            ],
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',

            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' }
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
          }}
        />
      )}
    />
  );
};

export default TinyMCEEditor;
